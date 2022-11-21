import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Account } from './Account'


@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number


	@Column({ type: 'text', unique: true })
	username: string

	@Column({ type: 'text' })
	password: string  

	@OneToOne(()=>Account, account=>account.balance)
	@JoinColumn({name:"account"})
	account:Account	

	@Column()
	idAccount:number
		
} 