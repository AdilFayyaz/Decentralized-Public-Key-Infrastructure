// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PKI {
  
    modifier onlyTrustedCA{
        require(checkIfTrustedCA(msg.sender), "Only Trusted CAs are allowed");
        _;
    }
    struct domain_data{
        string domainName;
        string organization;
        string country;
        string state;
        string emailAddr;
        string publicKey;
        uint daysValid;
        uint256 dateCreated;
        uint revokedByCount;
        bool valid;
        address paymentAddr;
        bool[] isRevokedBy;
    }
     struct petition{ //those who want to become a CA
        address petitioner;
        uint8 timeLapsed;
        uint8 votesReceived;
        address[] voters;
        bool added;
    }

    address [] public owners;

    petition [] public petitions;

        mapping(string => domain_data) public domain_name_map; //details of a single domain
    string [] public domainArray; //all domain names
    

    //change the below addresses to the ones in your own ganache workspace
    constructor(){
        owners.push(0x5Dd5d1def7f67E5f0B977dB341d7774F2ccC89b5);
        owners.push(0x2621922fFB7BF8b052aDa0cDBB0E2Bb15E6692dD);
        owners.push(0x8FB7452f0A4CddC463b3241A47Eb0Db5feeE01A3);
        owners.push(0x16dF74a6DbE94aa3FC3834e5A6589ec473e34f14);
        owners.push(0x263202fC6a8E70F58079859349F34dC1f82184F1);
        owners.push(0x4A896995f0C53a52D58381c22D137C25a7879AA8);
        owners.push(0x251018F4C3dcf280205D5D24770806ef14a90B42);
        owners.push(0x24524E2Fb653E06E001A9498c1c0B616e4d12F21);
      //owners.push(0x5C626149C2b5d1f199292a4C446D9f667758DfdA);
      //owners.push(0x5eF34402dD52aC15A6dE46490Eda54005EE4038f);
    }

      
    function vote(address _petitioner) public onlyTrustedCA{
        for (uint i=0; i<petitions.length;i++){
            //first increment time lapsed for all petitions
            petitions[i].timeLapsed+=1;
        }
        for (uint i=0; i<petitions.length; i++){
            //add vote of the person being voted for
            if (petitions[i].petitioner==_petitioner){
                require(checkIfVoted(msg.sender, petitions[i].voters)==false, "You've already voted for them");
                require(petitions[i].added==false, "They're already added to authorities");
                petitions[i].votesReceived+=1;
                petitions[i].voters.push(msg.sender);
            }
            //next check if any votes for any petitions have reached the threshold, if so they should be added to trusted CAs list
            //and their revoke status for all domains set to false
            if (petitions[i].votesReceived>=3 && petitions[i].added==false){
                owners.push(petitions[i].petitioner); //add to trusted
                for (uint j=0; j<domainArray.length; j++){
                    domain_name_map[domainArray[j]].isRevokedBy.push(false); //set domain's revoke to false
                }
                petitions[i].added=true;
            }
            //check if any that have not receieved needed votes have been in the petitioner array for more than 10 votes, if so, remove them
            if (petitions[i].timeLapsed>=4 && petitions[i].added==false){ //actually 10
                removePetition(petitions[i].petitioner);
            }
        }
        
       
            
    }

    //call this function in order to submit a petition if you want to become a Trusted CA
    function submitCAPetition() public{
        for(uint i=0; i<petitions.length; i++){
            if (petitions[i].petitioner==msg.sender){
                revert("You already have a pending a petition");
            }
        }
        require(checkIfTrustedCA(msg.sender)==false, "You are already a CA!");
        petition memory temp;
        temp.petitioner=msg.sender;
        temp.timeLapsed=0;
        temp.votesReceived=0;
        temp.added=false;
        petitions.push(temp);
    }
    
    function viewPetitions() view public returns(petition[] memory){
        return petitions;
    }

    //call this function to remove a petition from petitioner array    
    function removePetition(address petitioner) public  {
        for (uint i = 0;i<petitions.length; i++){
            if (petitions[i].petitioner==petitioner){
                petitions[i] = petitions[petitions.length-1];
                delete petitions[petitions.length-1];
                petitions.pop();
                break;
            }
        }        

    }

    //call this function to check if a voter has already voted for this petitioner
    function checkIfVoted(address _voter, address[] memory _voters) public view returns(bool){
        bool voted=false;
        for (uint i=0; i<_voters.length; i++){
            if (_voters[i]==_voter){
                voted=true;
            }
        }
        return voted;
    }



    function checkIfTrustedCA(address trustedca) public view returns(bool trust){
        bool canWeTrust = false;
        for(uint i=0;i<owners.length;i++){
            if(trustedca==owners[i]){
                canWeTrust = true;
            }
        }
        return canWeTrust;
    } 
    function checkIfDomainUsed(string memory domain) public view returns(bool isUsed){
        bool isUsed=false;
        for (uint i=0; i<domainArray.length; i++){
            if (keccak256(bytes(domainArray[i]))==keccak256(bytes(domain))){
                isUsed=true;
            }
        }
        return isUsed;
    }
    function getDomains() view public returns(string[] memory){
        return domainArray;
    }
    
   
    function registerDomain(string memory domainName, string memory organization, 
    string memory country, string memory state, string memory emailAddr,
     string memory publicKey, uint daysValid) public onlyTrustedCA {
        // domain - the one being registered
        // Every address has one or many domains registered to it
        // Add all the values associated with the domain 
        
        require(checkIfDomainUsed(domainName)==false, "Domain already exists"); // Domain should not exist before
        domainArray.push(domainName);
        //domainExists[domainName] = true;

        // mapping to domain name
        domain_name_map[domainName].domainName=domainName;
        domain_name_map[domainName].organization=organization;
        domain_name_map[domainName].country=country;
        domain_name_map[domainName].state=state;
        domain_name_map[domainName].emailAddr=emailAddr;
        domain_name_map[domainName].publicKey=publicKey;
        domain_name_map[domainName].daysValid = daysValid;
        domain_name_map[domainName].dateCreated = block.timestamp;
        domain_name_map[domainName].revokedByCount = 0;
        domain_name_map[domainName].paymentAddr = msg.sender;
        domain_name_map[domainName].valid = true;
        for(uint i=0; i<owners.length;i++){
            domain_name_map[domainName].isRevokedBy.push(false);
        }
        
    }

/*
    function getDomainData(string memory domainName) view public returns (string[] memory,
    string[] memory, string[] memory,string[] memory,string[] memory,uint,uint256,bool ){
        return(domain_name_map[domainName].organization, domain_name_map[domainName].country,
        domain_name_map[domainName].state, domain_name_map[domainName].emailAddr,
        domain_name_map[domainName].publicKey, domain_name_map[domainName].daysValid,
        domain_name_map[domainName].dateCreated,domain_name_map[domainName].isCertified);
    }
*/

    // return all values corresponding to a domain name as one string
    function getDomainData(string memory domainName) view public returns (domain_data memory){
        //return ("Domain Name: "+domain_name_map[domainName].domainName+"\"+"Organization: "+domain_name_map[domain_name_map].organization);
        return (domain_name_map[domainName]);
    }
    //return organization of domain
    function getOrganization(string memory domainName) view public returns (string memory org){
        return (domain_name_map[domainName].organization);
    }
    //return country of domain
    function getCountry(string memory domainName) view public returns (string memory con){
        return (domain_name_map[domainName].country);
    }
    //return registered email of domain
    function getEmail(string memory domainName) view public returns (string memory email){
        return (domain_name_map[domainName].emailAddr);
    }
    //return public key of domain
    function getKey(string memory domainName) view public returns (string memory key){
        return (domain_name_map[domainName].publicKey);
    }
    //return address of domain holder
    function getAddress(string memory domainName) view public returns (address){
        return (domain_name_map[domainName].paymentAddr);
    }
    //return creation date of domain
    function getCreationDate(string memory domainName) view public returns (uint256){
        return (domain_name_map[domainName].dateCreated);
    }

    //return which CA have and havent revoked domain
    function getCARevokeStatus(string memory domainName) view public returns (address[] memory, bool[] memory){
        return (owners, domain_name_map[domainName].isRevokedBy);    
    }

    function updatePublicKey(string memory domainName, string memory publicKeyNew) public onlyTrustedCA{
        domain_name_map[domainName].publicKey=publicKeyNew;
    }
    function updateDaysOfContract(string memory domainName, uint newDay) public onlyTrustedCA{
        domain_name_map[domainName].daysValid=newDay;
    }

    function getOwnerIndex(address ad) private returns(uint){
        for(uint i=0;i<owners.length;i++){
            if(ad == owners[i]){
                return i;
            }
        }
        return 1000;
    }
    
    function removeDomain(string memory domainName) public onlyTrustedCA  {
        for (uint i = 0; i<domainArray.length; i++){
            if (keccak256(abi.encodePacked(domainArray[i]))==keccak256(abi.encodePacked(domainName))){
                domainArray[i] = domainArray[domainArray.length-1];
                delete domainArray[domainArray.length-1];
                domainArray.pop();
                break;
            }
        }        

    }
  
    // or should every domain be valid at the time of registration
    function revokeDomain(string memory domainName) public onlyTrustedCA{
        // Only the CA can revoke a domain
        // maintain count how many CAs revoked a domain
        // every domain has a mapping of CA and mapping true or false.       
        
        require(verifyDomain(domainName), "Verify Domain name valid");
        require(domain_name_map[domainName].isRevokedBy[getOwnerIndex(msg.sender)]==false, "Verify if the domain has not been previously revoked");
        
        domain_name_map[domainName].isRevokedBy[getOwnerIndex(msg.sender)]=true;
        domain_name_map[domainName].revokedByCount +=1;
        // If 3 CAs reovke a contract only then set valid to false
        if (domain_name_map[domainName].revokedByCount >=3){
            domain_name_map[domainName].valid = false;
            removeDomain(domainName);
        }  
    }

    function verifyDomain(string memory domainName) view public returns(bool){
        return domain_name_map[domainName].valid;
        // Also verify from the timestamp - is the certificate valid anymore?
    }


    function getCAs() view public returns (address[] memory){
        return owners;
    }
    
}
// myins.registerDomain("www.a.com","f","p","d","d","s",23, {from: '0x9351eb4413BF082Ab6Adc1236cE7b3b791D89457'})
/*
****************checking voting***********
x.submitCAPetition({from:"0x5eF34402dD52aC15A6dE46490Eda54005EE4038f"})
x.submitCAPetition({from:"0x5C626149C2b5d1f199292a4C446D9f667758DfdA"})
x.viewPetitions()
x.vote("0x5eF34402dD52aC15A6dE46490Eda54005EE4038f")
x.vote("0x5eF34402dD52aC15A6dE46490Eda54005EE4038f", {from:"0x9129122c55b1055Bad9d9B56D50A19968a9db944"}) 
x.viewPetitions()
x.vote("0x5eF34402dD52aC15A6dE46490Eda54005EE4038f", {from:"0x54A49513BFdFdfdfe1D2d86709e2E8bFAF68081c"})
x.vote("0x5C626149C2b5d1f199292a4C446D9f667758DfdA", {from:"0x54A49513BFdFdfdfe1D2d86709e2E8bFAF68081c"})
x.viewPetitions()
x.getCAs()
*/