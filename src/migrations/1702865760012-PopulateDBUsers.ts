import { MigrationInterface, QueryRunner } from "typeorm"

export class PopulateDBUsers1702865760012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO users (id, name, balance) VALUES (1, "Júlio", 100);`)
        await queryRunner.query(`INSERT INTO users (id, name, balance) VALUES (2, "Miguel", 0);`)
        await queryRunner.query(`INSERT INTO users (id, name, balance) VALUES (3, "Ricardo", 24);`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                DELETE FROM users WHERE id in (1, 2, 3);
            `,
        )
    }

}
