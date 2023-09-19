import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1694114537029 implements MigrationInterface {
    name = 'FirstMigration1694114537029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`document\` (\`id\` varchar(36) NOT NULL, \`type\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promotion\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`expiration\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`center\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`is_remote\` tinyint NOT NULL DEFAULT 0, \`region\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question\` (\`id\` varchar(36) NOT NULL, \`question\` varchar(255) NOT NULL, \`response\` json NOT NULL, \`quizz_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`result\` (\`id\` varchar(36) NOT NULL, \`profile_id\` varchar(36) NULL, \`quizz_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quizz\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`is_completed\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` enum ('user', 'former', 'head_former', 'admin') NOT NULL DEFAULT 'user', \`hashed_token\` varchar(255) NULL, \`profile_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` (\`profile_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`status\` enum ('hired', 'scholar', 'pending') NOT NULL DEFAULT 'pending', \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`postal_code\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`rgpd\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`center_id\` varchar(36) NULL, \`promotion_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`duration\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`absence\` (\`id\` varchar(36) NOT NULL, \`morning_date\` date NOT NULL, \`afternoon_date\` date NOT NULL, \`promotion_id\` varchar(36) NULL, \`lesson_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promotion_has_lesson\` (\`promotion_id\` varchar(36) NOT NULL, \`lesson_id\` varchar(36) NOT NULL, INDEX \`IDX_f779342712c723e64f1b5b899b\` (\`promotion_id\`), INDEX \`IDX_e734f67bbffffb7777b1952340\` (\`lesson_id\`), PRIMARY KEY (\`promotion_id\`, \`lesson_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promotion_has_document\` (\`promotion_id\` varchar(36) NOT NULL, \`document_id\` varchar(36) NOT NULL, INDEX \`IDX_6d31476ac3080fde603027e3c4\` (\`promotion_id\`), INDEX \`IDX_63031e9366351883b63f5e3ad5\` (\`document_id\`), PRIMARY KEY (\`promotion_id\`, \`document_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`center_has_promotion\` (\`center_id\` varchar(36) NOT NULL, \`promotion_id\` varchar(36) NOT NULL, INDEX \`IDX_a498adee0a1b55c05bca2c67f8\` (\`center_id\`), INDEX \`IDX_fd41b756f16226ac630c9fc2bd\` (\`promotion_id\`), PRIMARY KEY (\`center_id\`, \`promotion_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quizz_has_lesson\` (\`quizz_id\` varchar(36) NOT NULL, \`lesson_id\` varchar(36) NOT NULL, INDEX \`IDX_dd813f7b42d67246edffff726a\` (\`quizz_id\`), INDEX \`IDX_262929f755ed3c8997b101d5ea\` (\`lesson_id\`), PRIMARY KEY (\`quizz_id\`, \`lesson_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile_has_absence\` (\`profile_id\` varchar(36) NOT NULL, \`absence_id\` varchar(36) NOT NULL, INDEX \`IDX_5d16505b43781360d17740f2fe\` (\`profile_id\`), INDEX \`IDX_4b5e100bea2f1a6969bd30f8c7\` (\`absence_id\`), PRIMARY KEY (\`profile_id\`, \`absence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile_has_quizz\` (\`profile_id\` varchar(36) NOT NULL, \`quizz_id\` varchar(36) NOT NULL, INDEX \`IDX_38ebbc7896dfb12e89a37fe0e0\` (\`profile_id\`), INDEX \`IDX_083a421aa0907359a5b527999c\` (\`quizz_id\`), PRIMARY KEY (\`profile_id\`, \`quizz_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile_has_lesson\` (\`profile_id\` varchar(36) NOT NULL, \`lesson_id\` varchar(36) NOT NULL, INDEX \`IDX_411329a3e523333de764403643\` (\`profile_id\`), INDEX \`IDX_c2a8edb157d3dba378d05a47ba\` (\`lesson_id\`), PRIMARY KEY (\`profile_id\`, \`lesson_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile_has_document\` (\`profile_id\` varchar(36) NOT NULL, \`document_id\` varchar(36) NOT NULL, INDEX \`IDX_723e10f0f178156cd8374a09ea\` (\`profile_id\`), INDEX \`IDX_767a5331c154e6b5205f8a1524\` (\`document_id\`), PRIMARY KEY (\`profile_id\`, \`document_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD CONSTRAINT \`FK_564db71b43267fd9a0131bab62b\` FOREIGN KEY (\`quizz_id\`) REFERENCES \`quizz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_8e6a5cf120c39e560b21798a270\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_8eb3618ceb6c59a2562541f972d\` FOREIGN KEY (\`quizz_id\`) REFERENCES \`quizz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f44d0cd18cfd80b0fed7806c3b7\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_86062cd256c1a832077db3ba2ba\` FOREIGN KEY (\`center_id\`) REFERENCES \`center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_ce9cde6e0f889f73f5b092483ba\` FOREIGN KEY (\`promotion_id\`) REFERENCES \`promotion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`absence\` ADD CONSTRAINT \`FK_9956eb9331c53fc5159bff35e2d\` FOREIGN KEY (\`promotion_id\`) REFERENCES \`promotion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`absence\` ADD CONSTRAINT \`FK_ddf8618e1d785a907d9415cf078\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promotion_has_lesson\` ADD CONSTRAINT \`FK_f779342712c723e64f1b5b899bc\` FOREIGN KEY (\`promotion_id\`) REFERENCES \`promotion\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`promotion_has_lesson\` ADD CONSTRAINT \`FK_e734f67bbffffb7777b1952340f\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promotion_has_document\` ADD CONSTRAINT \`FK_6d31476ac3080fde603027e3c43\` FOREIGN KEY (\`promotion_id\`) REFERENCES \`promotion\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`promotion_has_document\` ADD CONSTRAINT \`FK_63031e9366351883b63f5e3ad5a\` FOREIGN KEY (\`document_id\`) REFERENCES \`document\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`center_has_promotion\` ADD CONSTRAINT \`FK_a498adee0a1b55c05bca2c67f8f\` FOREIGN KEY (\`center_id\`) REFERENCES \`center\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`center_has_promotion\` ADD CONSTRAINT \`FK_fd41b756f16226ac630c9fc2bde\` FOREIGN KEY (\`promotion_id\`) REFERENCES \`promotion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quizz_has_lesson\` ADD CONSTRAINT \`FK_dd813f7b42d67246edffff726a5\` FOREIGN KEY (\`quizz_id\`) REFERENCES \`quizz\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`quizz_has_lesson\` ADD CONSTRAINT \`FK_262929f755ed3c8997b101d5eaf\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile_has_absence\` ADD CONSTRAINT \`FK_5d16505b43781360d17740f2fec\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`profile_has_absence\` ADD CONSTRAINT \`FK_4b5e100bea2f1a6969bd30f8c79\` FOREIGN KEY (\`absence_id\`) REFERENCES \`absence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile_has_quizz\` ADD CONSTRAINT \`FK_38ebbc7896dfb12e89a37fe0e05\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`profile_has_quizz\` ADD CONSTRAINT \`FK_083a421aa0907359a5b527999c1\` FOREIGN KEY (\`quizz_id\`) REFERENCES \`quizz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile_has_lesson\` ADD CONSTRAINT \`FK_411329a3e523333de7644036436\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`profile_has_lesson\` ADD CONSTRAINT \`FK_c2a8edb157d3dba378d05a47ba6\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile_has_document\` ADD CONSTRAINT \`FK_723e10f0f178156cd8374a09ea9\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`profile_has_document\` ADD CONSTRAINT \`FK_767a5331c154e6b5205f8a15249\` FOREIGN KEY (\`document_id\`) REFERENCES \`document\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile_has_document\` DROP FOREIGN KEY \`FK_767a5331c154e6b5205f8a15249\``);
        await queryRunner.query(`ALTER TABLE \`profile_has_document\` DROP FOREIGN KEY \`FK_723e10f0f178156cd8374a09ea9\``);
        await queryRunner.query(`ALTER TABLE \`profile_has_lesson\` DROP FOREIGN KEY \`FK_c2a8edb157d3dba378d05a47ba6\``);
        await queryRunner.query(`ALTER TABLE \`profile_has_lesson\` DROP FOREIGN KEY \`FK_411329a3e523333de7644036436\``);
        await queryRunner.query(`ALTER TABLE \`profile_has_quizz\` DROP FOREIGN KEY \`FK_083a421aa0907359a5b527999c1\``);
        await queryRunner.query(`ALTER TABLE \`profile_has_quizz\` DROP FOREIGN KEY \`FK_38ebbc7896dfb12e89a37fe0e05\``);
        await queryRunner.query(`ALTER TABLE \`profile_has_absence\` DROP FOREIGN KEY \`FK_4b5e100bea2f1a6969bd30f8c79\``);
        await queryRunner.query(`ALTER TABLE \`profile_has_absence\` DROP FOREIGN KEY \`FK_5d16505b43781360d17740f2fec\``);
        await queryRunner.query(`ALTER TABLE \`quizz_has_lesson\` DROP FOREIGN KEY \`FK_262929f755ed3c8997b101d5eaf\``);
        await queryRunner.query(`ALTER TABLE \`quizz_has_lesson\` DROP FOREIGN KEY \`FK_dd813f7b42d67246edffff726a5\``);
        await queryRunner.query(`ALTER TABLE \`center_has_promotion\` DROP FOREIGN KEY \`FK_fd41b756f16226ac630c9fc2bde\``);
        await queryRunner.query(`ALTER TABLE \`center_has_promotion\` DROP FOREIGN KEY \`FK_a498adee0a1b55c05bca2c67f8f\``);
        await queryRunner.query(`ALTER TABLE \`promotion_has_document\` DROP FOREIGN KEY \`FK_63031e9366351883b63f5e3ad5a\``);
        await queryRunner.query(`ALTER TABLE \`promotion_has_document\` DROP FOREIGN KEY \`FK_6d31476ac3080fde603027e3c43\``);
        await queryRunner.query(`ALTER TABLE \`promotion_has_lesson\` DROP FOREIGN KEY \`FK_e734f67bbffffb7777b1952340f\``);
        await queryRunner.query(`ALTER TABLE \`promotion_has_lesson\` DROP FOREIGN KEY \`FK_f779342712c723e64f1b5b899bc\``);
        await queryRunner.query(`ALTER TABLE \`absence\` DROP FOREIGN KEY \`FK_ddf8618e1d785a907d9415cf078\``);
        await queryRunner.query(`ALTER TABLE \`absence\` DROP FOREIGN KEY \`FK_9956eb9331c53fc5159bff35e2d\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_ce9cde6e0f889f73f5b092483ba\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_86062cd256c1a832077db3ba2ba\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f44d0cd18cfd80b0fed7806c3b7\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_8eb3618ceb6c59a2562541f972d\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_8e6a5cf120c39e560b21798a270\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP FOREIGN KEY \`FK_564db71b43267fd9a0131bab62b\``);
        await queryRunner.query(`DROP INDEX \`IDX_767a5331c154e6b5205f8a1524\` ON \`profile_has_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_723e10f0f178156cd8374a09ea\` ON \`profile_has_document\``);
        await queryRunner.query(`DROP TABLE \`profile_has_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_c2a8edb157d3dba378d05a47ba\` ON \`profile_has_lesson\``);
        await queryRunner.query(`DROP INDEX \`IDX_411329a3e523333de764403643\` ON \`profile_has_lesson\``);
        await queryRunner.query(`DROP TABLE \`profile_has_lesson\``);
        await queryRunner.query(`DROP INDEX \`IDX_083a421aa0907359a5b527999c\` ON \`profile_has_quizz\``);
        await queryRunner.query(`DROP INDEX \`IDX_38ebbc7896dfb12e89a37fe0e0\` ON \`profile_has_quizz\``);
        await queryRunner.query(`DROP TABLE \`profile_has_quizz\``);
        await queryRunner.query(`DROP INDEX \`IDX_4b5e100bea2f1a6969bd30f8c7\` ON \`profile_has_absence\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d16505b43781360d17740f2fe\` ON \`profile_has_absence\``);
        await queryRunner.query(`DROP TABLE \`profile_has_absence\``);
        await queryRunner.query(`DROP INDEX \`IDX_262929f755ed3c8997b101d5ea\` ON \`quizz_has_lesson\``);
        await queryRunner.query(`DROP INDEX \`IDX_dd813f7b42d67246edffff726a\` ON \`quizz_has_lesson\``);
        await queryRunner.query(`DROP TABLE \`quizz_has_lesson\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd41b756f16226ac630c9fc2bd\` ON \`center_has_promotion\``);
        await queryRunner.query(`DROP INDEX \`IDX_a498adee0a1b55c05bca2c67f8\` ON \`center_has_promotion\``);
        await queryRunner.query(`DROP TABLE \`center_has_promotion\``);
        await queryRunner.query(`DROP INDEX \`IDX_63031e9366351883b63f5e3ad5\` ON \`promotion_has_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d31476ac3080fde603027e3c4\` ON \`promotion_has_document\``);
        await queryRunner.query(`DROP TABLE \`promotion_has_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_e734f67bbffffb7777b1952340\` ON \`promotion_has_lesson\``);
        await queryRunner.query(`DROP INDEX \`IDX_f779342712c723e64f1b5b899b\` ON \`promotion_has_lesson\``);
        await queryRunner.query(`DROP TABLE \`promotion_has_lesson\``);
        await queryRunner.query(`DROP TABLE \`absence\``);
        await queryRunner.query(`DROP TABLE \`lesson\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`quizz\``);
        await queryRunner.query(`DROP TABLE \`result\``);
        await queryRunner.query(`DROP TABLE \`question\``);
        await queryRunner.query(`DROP TABLE \`center\``);
        await queryRunner.query(`DROP TABLE \`promotion\``);
        await queryRunner.query(`DROP TABLE \`document\``);
    }

}
