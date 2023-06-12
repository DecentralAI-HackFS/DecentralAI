// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./lilypad/LilypadCallerInterface.sol";
import "./lilypad/LilypadEventsUpgradeable.sol";

contract DocumentIndexingCaller is LilypadCallerInterface, Ownable {
    address public bridgeAddress;
    LilypadEventsUpgradeable bridge;
    uint256 public lilypadFee;
    

    struct Document {
        string cid;
        address contributor;
        uint jobId;
    }
    mapping(uint => address) public contributors;
    mapping(address => uint) public jobIds;
    Document[] public documents;
    event DocumentIndexed(string indexed _cid, address indexed _contributor, uint indexed _jobId);

   string constant spec = '{'
        '"Engine": "docker",'
        '"Verifier": "noop",'
        '"PublisherSpec": {"Type": "estuary"},'
        '"Docker": {'
        '"Image": "ghcr.io/bacalhau-project/examples/stable-diffusion-gpu:0.0.1",'
        '"Entrypoint": ["python", "main.py", "--o", "./outputs", "--p", "mock text processing"]},'
        '"Resources": {"GPU": "1"},'
        '"Outputs": [{"Name": "outputs", "Path": "/outputs"}],'
        '"Deal": {"Concurrency": 1}'
        '}';
   

    constructor(address _bridgeAddress) {
        bridgeAddress = _bridgeAddress;
        bridge = LilypadEventsUpgradeable(_bridgeAddress);
        uint fee = bridge.getLilypadFee();
        lilypadFee = fee;
    }

    function setBridgeAddress(address _bridgeAddress) public onlyOwner {
        bridgeAddress = _bridgeAddress;
        bridge = LilypadEventsUpgradeable(_bridgeAddress);
    }
    
    function getLilypadFee() external {
        uint fee = bridge.getLilypadFee(); 
        lilypadFee = fee;
    }

    
    function setLilypadFee(uint256 _fee) public onlyOwner {
        require(_fee > 0, "Lilypad fee must be greater than 0");
        lilypadFee = _fee;
    }

    function requestIndexing() public payable {
        // require(msg.value >= lilypadFee, "Not enough to run Lilypad job");

        uint jobId = bridge.runLilypadJob{value: lilypadFee}(address(this), spec, uint8(LilypadResultType.CID));
        
        // require(jobId > 0, "job didn't return a value");
        contributors[jobId] = msg.sender;
        jobIds[msg.sender] = jobId;
    }

    function allDocuments() public view returns (Document[] memory) {
        return documents;
    }

    function lilypadFulfilled(address _from, uint _jobId, LilypadResultType _resultType, string calldata _result) external override {
        // require(_from == address(bridge)); 
        // require(_resultType == LilypadResultType.CID);

        Document memory document = Document(_result, contributors[_jobId], _jobId);
        documents.push(document);

        emit DocumentIndexed(_result, contributors[_jobId], _jobId);
        delete contributors[_jobId];
    }

    function lilypadCancelled(address _from, uint _jobId, string calldata _errorMsg) external override {
        require(_from == address(bridge)); 
        delete contributors[_jobId];
    }
}


