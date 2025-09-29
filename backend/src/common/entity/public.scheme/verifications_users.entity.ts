import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EntityVerifications } from "../reference.scheme/verifications.entity";
import { EntityUser } from "./user.entity";

@Entity({ schema: 'public', name: 'verifications_users'})
export class EntityVerificationsUsers {
    @PrimaryColumn({ type: "int4" })
    verification_id: number;

    @PrimaryColumn({ type: "int4" })
    user_id: number;

    @Column({ type: "text", nullable: true })
    service_data: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    password: string | null;

    @Column({ type: 'text', unique: true, nullable: true })
    email: string | null;

    @ManyToOne(() => EntityUser, user => user.verifications, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: EntityUser;

    @ManyToOne(() => EntityVerifications, verification => verification.users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'verification_id' })
    verification: EntityVerifications;
}