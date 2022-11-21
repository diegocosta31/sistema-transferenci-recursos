import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-errors'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { accountRepository } from '../repositories/accountRepository'

export class UserController {
	async create(req: Request, res: Response) {
		const {  username, password, confirmPassword} = req.body

		const userExists = await userRepository.findOneBy({ username })

		if (username.length < 3) {
			throw new BadRequestError('UserName precisa ter pelo menos 3 caracteres')
		}
		if (userExists) {
			throw new BadRequestError('UserName já existe')
		}
		if (password !== confirmPassword) {
			throw new BadRequestError('Senhas diferentes')
		}
		if (password.length < 8) {
			throw new BadRequestError('Sua senha deve ter pelo menos 8 caracteres')
		}
		
		const hasUpper = /[A-Z]/.test(password)				
		
		if(hasUpper === false){
			throw new BadRequestError('Sua senha deve ter pelo menos 1 caracter maiúsculo')
		}
		const hasNumber = /[0-9]/.test(password)				
		
		if(hasNumber === false){
			throw new BadRequestError('Sua senha deve ter pelo menos 1 caracter númerico')
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const newAccount = accountRepository.create({						
			balance: 100		
		})
		
		await accountRepository.save(newAccount)

		const newUser = userRepository.create({			
			username,
			password: hashPassword,
			account:newAccount,
			idAccount:newAccount.id
		})
		
		
		await userRepository.save(newUser)

		const token = jwt.sign({ id: newUser.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '24h',
		})		

		const { password: _, ...user } = newUser

		
		return res.status(201).json({
			user: user,
			token: token,})
	}

	async login(req: Request, res: Response) {
		const { username, password } = req.body

		const user = await userRepository.findOneBy({ username })		

		if (!user) {
		throw new BadRequestError('UserName inválido')
		
		}
		

		const verifyPass = await bcrypt.compare(password, user.password)

		if (!verifyPass) {
			throw new BadRequestError('Senha inválida')
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '24h',
		})

		const { password: _, ...userLogin } = user
		
		
		return res.json({
			user: userLogin,
			token: token,			
		})
	}
	async getProfile(req: Request, res: Response) {
		const  idAccount  = req.user.idAccount

		const detailsAccount = await accountRepository.findOneBy({id:idAccount})
		
		const detail =[req.user, detailsAccount]
		return res.json(detail)
	}
	
}

	

