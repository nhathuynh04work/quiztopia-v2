import { Module } from "@nestjs/common";
import { QuizzesController } from "./quizzes.controller";
import { QuizzesService } from "./quizzes.service";
import { QuizzesRetrievalService } from "./retrieval/quizzes-retrieval.service";
import { QuizzesValidationService } from "./validation/quizzes-validation.service";

@Module({
  controllers: [QuizzesController],
  providers: [
    QuizzesService,
    QuizzesRetrievalService,
    QuizzesValidationService,
  ],
})
export class QuizzesModule {}
