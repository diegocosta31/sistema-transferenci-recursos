import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne, Timestamp} from "typeorm"

@Entity('Transaction')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    debitedAccountId: number

    @Column()
    creditedAccountId: number


    @Column()
    value: number
    
    
    @Column()
    createdAt: string

}
