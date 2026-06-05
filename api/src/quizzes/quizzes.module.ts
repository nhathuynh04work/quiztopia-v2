import { Module } from "@nestjs/common";
import { QuizzesController } from "./quizzes.controller";
import { QuizzesService } from "./quizzes.service";
import { QuizzesValidationService } from "./quizzes-validation.service";

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesValidationService],
})
export class QuizzesModule {}
