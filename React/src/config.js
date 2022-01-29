export const SIMP_STORAGE_ADDRESS = '0x6E71D0a2D89e104b1727df31Cb4361A24EFAb92D'
export const SIMP_STORAGE_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "domainArray",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "domain_name_map",
    "outputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "organization",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "country",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "state",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "emailAddr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "publicKey",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "daysValid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "dateCreated",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "revokedByCount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "valid",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "paymentAddr",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "owners",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "petitions",
    "outputs": [
      {
        "internalType": "address",
        "name": "petitioner",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "timeLapsed",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "votesReceived",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "added",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_petitioner",
        "type": "address"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "submitCAPetition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "viewPetitions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "petitioner",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "timeLapsed",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "votesReceived",
            "type": "uint8"
          },
          {
            "internalType": "address[]",
            "name": "voters",
            "type": "address[]"
          },
          {
            "internalType": "bool",
            "name": "added",
            "type": "bool"
          }
        ],
        "internalType": "struct PKI.petition[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "petitioner",
        "type": "address"
      }
    ],
    "name": "removePetition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "_voters",
        "type": "address[]"
      }
    ],
    "name": "checkIfVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "trustedca",
        "type": "address"
      }
    ],
    "name": "checkIfTrustedCA",
    "outputs": [
      {
        "internalType": "bool",
        "name": "trust",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domain",
        "type": "string"
      }
    ],
    "name": "checkIfDomainUsed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isUsed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getDomains",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "organization",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "country",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "state",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "emailAddr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "publicKey",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "daysValid",
        "type": "uint256"
      }
    ],
    "name": "registerDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getDomainData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "domainName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "organization",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "country",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "state",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "emailAddr",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "publicKey",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "daysValid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dateCreated",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "revokedByCount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "valid",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "paymentAddr",
            "type": "address"
          },
          {
            "internalType": "bool[]",
            "name": "isRevokedBy",
            "type": "bool[]"
          }
        ],
        "internalType": "struct PKI.domain_data",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getOrganization",
    "outputs": [
      {
        "internalType": "string",
        "name": "org",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getCountry",
    "outputs": [
      {
        "internalType": "string",
        "name": "con",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getEmail",
    "outputs": [
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getKey",
    "outputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getCreationDate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "getCARevokeStatus",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "bool[]",
        "name": "",
        "type": "bool[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "publicKeyNew",
        "type": "string"
      }
    ],
    "name": "updatePublicKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "newDay",
        "type": "uint256"
      }
    ],
    "name": "updateDaysOfContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "removeDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "revokeDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domainName",
        "type": "string"
      }
    ],
    "name": "verifyDomain",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getCAs",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]