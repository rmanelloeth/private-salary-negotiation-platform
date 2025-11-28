// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SalaryNegotiationSimple
 * @notice Упрощенная версия контракта для переговоров о зарплате
 * В будущем будет добавлена FHE функциональность
 */
contract SalaryNegotiationSimple {
    struct Negotiation {
        address employer;
        address candidate;
        uint256 jobId;
        uint32 employerOffer;
        uint32 candidateCounter;
        bool employerAccepted;
        bool candidateAccepted;
        bool isActive;
        uint256 createdAt;
        uint256 lastUpdated;
    }

    mapping(uint256 => Negotiation) public negotiations;
    mapping(address => uint256[]) public userNegotiations;

    uint256 public negotiationCounter;

    event NegotiationStarted(
        uint256 indexed negotiationId,
        address indexed employer,
        address indexed candidate,
        uint256 jobId
    );
    event OfferUpdated(
        uint256 indexed negotiationId,
        address indexed sender,
        bool isEmployer
    );
    event NegotiationAccepted(
        uint256 indexed negotiationId,
        address indexed acceptor
    );
    event NegotiationCompleted(uint256 indexed negotiationId);

    function startNegotiation(
        address _candidate,
        uint256 _jobId,
        uint32 _initialOffer
    ) public returns (uint256) {
        uint256 negotiationId = negotiationCounter++;

        negotiations[negotiationId] = Negotiation({
            employer: msg.sender,
            candidate: _candidate,
            jobId: _jobId,
            employerOffer: _initialOffer,
            candidateCounter: 0,
            employerAccepted: false,
            candidateAccepted: false,
            isActive: true,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });

        userNegotiations[msg.sender].push(negotiationId);
        userNegotiations[_candidate].push(negotiationId);

        emit NegotiationStarted(negotiationId, msg.sender, _candidate, _jobId);
        return negotiationId;
    }

    function updateEmployerOffer(
        uint256 _negotiationId,
        uint32 _newOffer
    ) public {
        Negotiation storage negotiation = negotiations[_negotiationId];
        require(negotiation.employer == msg.sender, "Not the employer");
        require(negotiation.isActive, "Negotiation not active");

        negotiation.employerOffer = _newOffer;
        negotiation.employerAccepted = false;
        negotiation.candidateAccepted = false;
        negotiation.lastUpdated = block.timestamp;

        emit OfferUpdated(_negotiationId, msg.sender, true);
    }

    function updateCandidateCounter(
        uint256 _negotiationId,
        uint32 _newCounter
    ) public {
        Negotiation storage negotiation = negotiations[_negotiationId];
        require(negotiation.candidate == msg.sender, "Not the candidate");
        require(negotiation.isActive, "Negotiation not active");

        negotiation.candidateCounter = _newCounter;
        negotiation.employerAccepted = false;
        negotiation.candidateAccepted = false;
        negotiation.lastUpdated = block.timestamp;

        emit OfferUpdated(_negotiationId, msg.sender, false);
    }

    function acceptOffer(uint256 _negotiationId) public {
        Negotiation storage negotiation = negotiations[_negotiationId];
        require(negotiation.isActive, "Negotiation not active");
        
        if (msg.sender == negotiation.employer) {
            require(!negotiation.employerAccepted, "Already accepted");
            negotiation.employerAccepted = true;
        } else if (msg.sender == negotiation.candidate) {
            require(!negotiation.candidateAccepted, "Already accepted");
            negotiation.candidateAccepted = true;
        } else {
            revert("Not authorized");
        }

        emit NegotiationAccepted(_negotiationId, msg.sender);

        if (negotiation.employerAccepted && negotiation.candidateAccepted) {
            negotiation.isActive = false;
            emit NegotiationCompleted(_negotiationId);
        }
    }

    function getNegotiation(uint256 _negotiationId) public view returns (
        address employer,
        address candidate,
        uint256 jobId,
        uint32 employerOffer,
        uint32 candidateCounter,
        bool employerAccepted,
        bool candidateAccepted,
        bool isActive,
        uint256 createdAt,
        uint256 lastUpdated
    ) {
        Negotiation memory negotiation = negotiations[_negotiationId];
        return (
            negotiation.employer,
            negotiation.candidate,
            negotiation.jobId,
            negotiation.employerOffer,
            negotiation.candidateCounter,
            negotiation.employerAccepted,
            negotiation.candidateAccepted,
            negotiation.isActive,
            negotiation.createdAt,
            negotiation.lastUpdated
        );
    }

    function getUserNegotiations(address _user) public view returns (uint256[] memory) {
        return userNegotiations[_user];
    }
}

