import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity('Accounts')
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    balance: number  
}
