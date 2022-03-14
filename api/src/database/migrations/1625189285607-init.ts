import {MigrationInterface, QueryRunner} from "typeorm";

export class init1625189285607 implements MigrationInterface {
    name = 'init1625189285607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tasks` CHANGE `status` `status` tinyint NOT NULL DEFAULT '1'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tasks` CHANGE `status` `status` tinyint NOT NULL");
    }

}
