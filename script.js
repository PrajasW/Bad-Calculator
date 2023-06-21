const num1 = document.getElementById('num1')
const num2 = document.getElementById('num2')
const result = document.getElementById('result')
const transaction = document.getElementById('transaction')

const contractAddress = "0x9294824C5de32905adDFcF9BAd69cc86a29b82BA";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_b",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_b",
				"type": "uint256"
			}
		],
		"name": "div",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_b",
				"type": "uint256"
			}
		],
		"name": "multi",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_b",
				"type": "uint256"
			}
		],
		"name": "sub",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getA",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOperation",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getResult",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
async function getContractForWrite(a,b,operation){
	const provider = new ethers.providers.Web3Provider(window.ethereum,'sepolia')
	await provider.send("eth_requestAccounts", [])
	const accounts = await provider.listAccounts();
	const signer = provider.getSigner(accounts[0]);
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	if(operation == "sum"){
		return contract.add(a,b);
	}
	if(operation == "sub"){
		return contract.sub(a,b);
	}
	if(operation == "multi"){
		return contract.multi(a,b);
	}
	if(operation == "div"){
		return contract.div(a,b);
	}
}
async function add(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const sum = await getContractForWrite(val1,val2,"sum")
	result.innerHTML = sum.toString();
	await loadTransaction();
}
async function subtract(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const diff = await getContractForWrite(val1,val2,"sub")
	result.innerHTML = diff.toString();
	await loadTransaction();
}
async function multiply(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const prod = await getContractForWrite(val1,val2,"multi");
	result.innerHTML = prod.toString()
	await loadTransaction();
}
async function divide(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const sum = await getContractForWrite(val1,val2,"div");
	result.innerHTML = sum.toString()
	await loadTransaction();
}
async function loadTransaction(){
	const provider = new ethers.providers.Web3Provider(window.ethereum,'sepolia')
	await provider.send("eth_requestAccounts", [])
	const accounts = await provider.listAccounts();
	const signer = provider.getSigner(accounts[0]);
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const a = await contract.getA();
	const b = await contract.getB();
	const result = await contract.getResult();
	const operation = await contract.getOperation();
	if(operation == "genesis"){
		transaction.innerHTML = `transactions yet`
	}
	else{
		transaction.innerHTML = `${a} ${operation} ${b} is ${result}`
	}
}
loadTransaction();