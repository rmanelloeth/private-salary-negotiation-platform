// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title JobMarketplaceSimple
 * @notice Упрощенная версия платформы для переговоров о зарплате
 * В будущем будет добавлена FHE функциональность
 */
contract JobMarketplaceSimple {
    struct JobListing {
        address employer;
        uint32 minSalary;  // В будущем будет зашифровано
        uint32 maxSalary;  // В будущем будет зашифровано
        string jobTitle;
        string description;
        bool isActive;
        uint256 createdAt;
    }

    struct CandidateApplication {
        address candidate;
        uint32 minExpected;  // В будущем будет зашифровано
        uint32 maxExpected;  // В будущем будет зашифровано
        uint256 jobId;
        bool isActive;
        uint256 createdAt;
    }

    struct Match {
        uint256 jobId;
        uint256 applicationId;
        bool isConfirmed;
        uint256 matchedAt;
    }

    mapping(uint256 => JobListing) public jobs;
    mapping(uint256 => CandidateApplication) public applications;
    mapping(uint256 => Match[]) public jobMatches;
    mapping(address => uint256[]) public employerJobs;
    mapping(address => uint256[]) public candidateApplications;

    uint256 public jobCounter;
    uint256 public applicationCounter;
    uint256 public matchCounter;

    event JobCreated(uint256 indexed jobId, address indexed employer, string jobTitle);
    event ApplicationSubmitted(uint256 indexed applicationId, uint256 indexed jobId, address indexed candidate);
    event MatchFound(uint256 indexed matchId, uint256 indexed jobId, uint256 indexed applicationId);
    event MatchConfirmed(uint256 indexed matchId);

    function createJob(
        uint32 _minSalary,
        uint32 _maxSalary,
        string calldata _jobTitle,
        string calldata _description
    ) public returns (uint256) {
        require(_minSalary <= _maxSalary, "Invalid salary range");

        uint256 jobId = jobCounter++;
        
        jobs[jobId] = JobListing({
            employer: msg.sender,
            minSalary: _minSalary,
            maxSalary: _maxSalary,
            jobTitle: _jobTitle,
            description: _description,
            isActive: true,
            createdAt: block.timestamp
        });

        employerJobs[msg.sender].push(jobId);

        emit JobCreated(jobId, msg.sender, _jobTitle);
        return jobId;
    }

    function applyForJob(
        uint256 _jobId,
        uint32 _minExpected,
        uint32 _maxExpected
    ) public returns (uint256) {
        require(jobs[_jobId].isActive, "Job not active");
        require(_minExpected <= _maxExpected, "Invalid expected range");

        uint256 applicationId = applicationCounter++;
        
        applications[applicationId] = CandidateApplication({
            candidate: msg.sender,
            minExpected: _minExpected,
            maxExpected: _maxExpected,
            jobId: _jobId,
            isActive: true,
            createdAt: block.timestamp
        });

        candidateApplications[msg.sender].push(applicationId);

        _checkMatch(_jobId, applicationId);

        emit ApplicationSubmitted(applicationId, _jobId, msg.sender);
        return applicationId;
    }

    function _checkMatch(uint256 _jobId, uint256 _applicationId) internal {
        JobListing memory job = jobs[_jobId];
        CandidateApplication memory application = applications[_applicationId];

        // Проверяем пересечение диапазонов
        bool hasMatch = application.minExpected <= job.maxSalary && 
                       application.maxExpected >= job.minSalary;

        if (hasMatch) {
            uint256 matchId = matchCounter++;
            jobMatches[_jobId].push(Match({
                jobId: _jobId,
                applicationId: _applicationId,
                isConfirmed: false,
                matchedAt: block.timestamp
            }));

            emit MatchFound(matchId, _jobId, _applicationId);
        }
    }

    function confirmMatch(uint256 _jobId, uint256 _applicationId) public {
        Match[] storage matches = jobMatches[_jobId];
        bool found = false;
        
        for (uint256 i = 0; i < matches.length; i++) {
            if (matches[i].applicationId == _applicationId) {
                require(
                    jobs[_jobId].employer == msg.sender || 
                    applications[_applicationId].candidate == msg.sender,
                    "Not authorized"
                );
                matches[i].isConfirmed = true;
                found = true;
                emit MatchConfirmed(i);
                break;
            }
        }
        
        require(found, "Match not found");
    }

    function getJob(uint256 _jobId) public view returns (
        address employer,
        uint32 minSalary,
        uint32 maxSalary,
        string memory jobTitle,
        string memory description,
        bool isActive,
        uint256 createdAt
    ) {
        JobListing memory job = jobs[_jobId];
        return (
            job.employer,
            job.minSalary,
            job.maxSalary,
            job.jobTitle,
            job.description,
            job.isActive,
            job.createdAt
        );
    }

    function getEmployerJobs(address _employer) public view returns (uint256[] memory) {
        return employerJobs[_employer];
    }

    function getCandidateApplications(address _candidate) public view returns (uint256[] memory) {
        return candidateApplications[_candidate];
    }

    function getJobMatches(uint256 _jobId) public view returns (Match[] memory) {
        return jobMatches[_jobId];
    }

    function deactivateJob(uint256 _jobId) public {
        require(jobs[_jobId].employer == msg.sender, "Not the employer");
        jobs[_jobId].isActive = false;
    }
}

