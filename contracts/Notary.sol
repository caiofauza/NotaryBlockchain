pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Notary
 * @dev Notary system
 */

contract Notary {
    uint256 public firmCounter;

    constructor () public{
        firmCounter = 0;
    }

    struct Firm {
        address owner;
        string CPF;
        bytes32 Signature;
    }

    struct Operation {
        address beneficiary;
        string firmOwner;
        string CPF;
        bytes32 Signature;
        bool status;
    }

    mapping (address => Operation) operations;
    mapping (address => Firm) firms;


    function hashSignature(uint256 signature) public returns (bytes32 sigHash){
        return keccak256(abi.encodePacked(signature));
    }

    function testSignature(address firmOwner, bytes32 signature) public returns (bool){
        if(signature == firms[firmOwner].Signature){
            return true;
        }
        return false;
    }

    function openFirm(address firmOwner, string memory CPF, uint256 signature) public returns(bool){
        firms[firmOwner].Signature = hashSignature(signature);
        firms[firmOwner].CPF = CPF;
        return true;
    }

    function recognizeFirm(address firmOwner, string memory CPF, uint256 signature) public payable returns(bool){
        bytes32 signatureHashed = hashSignature(signature);
        if(testSignature(firmOwner, signatureHashed)){
            operations[firmOwner].CPF = CPF;
            operations[firmOwner].Signature = signatureHashed;
            operations[firmOwner].status = true;   
            return true;
        }
        operations[firmOwner].status = false;
        return false;
    }

    function getFirms(address firmOwner) public view returns(string memory CPF, bytes32 Signature){
        return (firms[firmOwner].CPF, firms[firmOwner].Signature);
    }

    function getOperations(address firmOwner) public view returns(string memory CPF, bytes32 Signature, bool status){
        return (operations[firmOwner].CPF, operations[firmOwner].Signature, operations[firmOwner].status);
    }
    
    function getLastTransactionStatus(address firmOwner) public view returns(bool status){
        return (operations[firmOwner].status);
    }
}