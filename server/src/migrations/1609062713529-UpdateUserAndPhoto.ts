import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAndPhoto1609062713529 implements MigrationInterface {
  name = "UpdateUserAndPhoto1609062713529";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `photo` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `userId` varchar(255) NOT NULL, `url` varchar(255) NULL, `description` varchar(255) NULL, `category` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_4494006ff358f754d07df5ccc8` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `user` (`githubLogin` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `githubToken` varchar(255) NOT NULL, PRIMARY KEY (`githubLogin`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `photo` ADD CONSTRAINT `FK_4494006ff358f754d07df5ccc87` FOREIGN KEY (`userId`) REFERENCES `user`(`githubLogin`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `photo` DROP FOREIGN KEY `FK_4494006ff358f754d07df5ccc87`"
    );
    await queryRunner.query("DROP TABLE `user`");
    await queryRunner.query(
      "DROP INDEX `IDX_4494006ff358f754d07df5ccc8` ON `photo`"
    );
    await queryRunner.query("DROP TABLE `photo`");
  }
}
