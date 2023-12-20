import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitDatabase1702864847464 implements MigrationInterface {
    name = 'InitDatabase1702864847464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "balance",
                        type: "decimal(10, 2)",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users`);
    }

}
