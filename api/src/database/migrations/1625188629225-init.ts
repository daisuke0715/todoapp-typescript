import {MigrationInterface, QueryRunner} from "typeorm";

export class init1625188629225 implements MigrationInterface {
    name = 'init1625188629225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tasks` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `status` tinyint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `tasks`");
    }

}
