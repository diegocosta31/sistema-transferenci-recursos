import { AppDataSource } from '../data-source'
import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-errors'
import { accountRepository } from '../repositories/accountRepository'
import { transactionRepository } from '../repositories/transactionRepository'
import { userRepository } from '../repositories/userRepository'
import {Account} from "../entities/Account"


export class TransactionsController {
	async transaction(req: Request, res: Response) {
		
		const dateNow = new Date()
		let d = String(dateNow.getDate()).padStart(2, '0')
		let m = String(dateNow.getMonth() + 1).padStart(2, '0')
		let y = String(dateNow.getFullYear())
		let h = String(dateNow.getHours()).padStart(2, '0')
		let mn = String(dateNow.getMinutes()).padStart(2, '0')
		const date = d+'/'+m+'/'+y+' '+h + ':' + mn

		const {  account, balance , value, to } = req.body

		if (account == to ) {
			throw new BadRequestError('Não pode trasnferir pra si mesmo')
		}	

		const newBalance = balance - value

		if ((newBalance) < 0 ) {
			throw new BadRequestError('Saldo insuficiente')
		}

		const accountExists = await accountRepository.findOne({
			where:{
				id: to
			}
		})
		

		if (!accountExists) {
			throw new BadRequestError('Conta inexistente')
		}
		
		
		const newTransaction = transactionRepository.create({
			debitedAccountId: account,
			creditedAccountId: to ,
			value,
			createdAt: date
		})

		await transactionRepository.save(newTransaction)

		await AppDataSource.createQueryBuilder().update(Account).set({
			balance: newBalance
		}).where("id = :id", {id:account}).execute()
		
		const accountTo = await accountRepository.findOneBy({id:to})
		
		const newBalanceAccountTo = Number(accountTo?.balance) + Number(value)

		await AppDataSource.createQueryBuilder().update(Account).set({
			balance: newBalanceAccountTo
		}).where("id = :id", {id:to}).execute()

		const user = await userRepository.find({
			where:{
				account: account
			}
		})
		
		const accountUser = await accountRepository.find({
			where:{
				id: account
			}
		})
		

		return res.status(201).json(newTransaction)
	}

	async getTransactions(req: Request, res: Response) {
		const  idAccount  = req.user.idAccount
		
		

		
		const transactions = await transactionRepository.find({
			where:[
				{creditedAccountId: idAccount},
				{debitedAccountId:idAccount}
			]
		})

		if (!transactions) {
			throw new BadRequestError('Nenhuma transação encontrada')
		}	
		
		return res.status(200).json(transactions)
	}
	
	
}
