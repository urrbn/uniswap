const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test", function () {
  before(async function () {
    const Adapter = await ethers.getContractFactory("Adapter")
    this.adapter = await Adapter.deploy();
    await this.adapter.deployed();

    const Pop = await ethers.getContractFactory("Pop")
    this.pop = await Pop.deploy("Pop", "POP");
    await this.pop.deployed();

    const Acdm = await ethers.getContractFactory("Acdm")
    this.acdm = await Acdm.deploy("Acdm", "ACDM");
    await this.acdm.deployed();

    this.signers = await ethers.getSigners()
    this.owner = this.signers[0]
    this.alice = this.signers[3]
    this.bob = this.signers[4]
    this.provider = await ethers.provider
    this.router = await new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', ['function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)', 'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)', 'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)', 'function swapExactTokensForETHSupportingFeeOnTransferTokens( uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external'], this.provider)
    
    const RouterWSigner = await this.router.connect(this.owner)
    
    //await this.pop.approve(this.owner.address, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', ethers.utils.parseEther("1000000"));
    //await RouterWSigner.addLiquidityETH(
    //  this.pop.address,
    //  ethers.utils.parseEther("50000"),
    //  ethers.utils.parseEther("40000"),
    //  ethers.utils.parseEther("200"),
    //  this.owner.address ,
    //  Math.floor(Date.now() / 1000) + 60 * 10,
    //  {value : ethers.utils.parseEther("200")}
    //);
    })
  
  it("create pair", async function () {
    const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    
    await this.adapter.createPair(this.pop.address, this.acdm.address)
    await this.adapter.createPair(this.pop.address, WETH)
    
  });

  it('Add liquidityEth', async function (){
    const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    await this.pop.approve(this.adapter.address, ethers.utils.parseEther('1000')) 
    //await this.pop.approve(this.adapter.address, this.router.address, ethers.utils.parseEther('10000'))
  
    await this.adapter.addLiquidityETH(this.pop.address, ethers.utils.parseEther('1000'), 
        ethers.utils.parseEther('10'), 
        this.owner.address, 
        { value: ethers.utils.parseEther("10") })
  })

  //it('Add liquidity', async function (){
  //  await this.pop.approve(this.adapter.address, ethers.utils.parseEther('10000')) 
  //  await this.pop.approve(this.router.address, ethers.utils.parseEther('10000'))
  //  await this.acdm.approve(this.adapter.address, ethers.utils.parseEther('10000')) 
  //  await this.acdm.approve(this.router.address, ethers.utils.parseEther('10000'))
  //  await this.adapter.addLiquidityTokens(this.pop.address, this.acdm.address, ethers.utils.parseEther('1000'), ethers.utils.parseEther('1000'))
  //})
//
  //it('swap', async function (){
  //  const RouterWSigner = await this.router.connect(this.owner)
  //  const WETH ="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  //  const path = [this.pop.address,  WETH]
  //  
  //  
  //  await this.pop.approve(this.adapter.address, ethers.utils.parseEther('100000'))
  //  //await this.acdm.approve(this.adapter.address, ethers.utils.parseEther('10000'))
  //  
  //  await RouterWSigner.swapExactTokensForETHSupportingFeeOnTransferTokens(
  //    ethers.utils.parseEther("10000"),
  //    1,
  //    path,
  //    this.owner.address,
  //    Math.floor(Date.now() / 1000) + 60 * 10
  //  )
  //  //await this.adapter.swap(this.pop.address, WETH, ethers.utils.parseEther('1000'))
  //})
});
