import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard";
import { OptionalJwtAccessGuard } from "../auth/guards/optional-jwt-access.guard";
import {
  GetQuizzesQueryDTO,
  PublishQuizPayloadDTO,
  UpsertQuizDTO,
} from "./schemas/quiz.schema";
import { PaginationQueryDTO } from "../common/schemas/pagination.schema";
import type { AuthenticatedRequest } from "../auth/auth.type";
import { type Request } from "express";

@Controller("quizzes")
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(JwtAccessGuard)
  @Get()
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query() query: GetQuizzesQueryDTO,
  ) {
    return this.quizzesService.getQuizzes(req.user.id, query);
  }

  @Get("discover")
  async discover(@Query() query: PaginationQueryDTO) {
    return this.quizzesService.getDiscoverQuizzes(query);
  }

  @UseGuards(JwtAccessGuard)
  @Get(":id")
  async findOne(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    return this.quizzesService.getQuizById(req.user.id, id);
  }

  @UseGuards(JwtAccessGuard)
  @Post()
  async upsert(
    @Body() payload: UpsertQuizDTO,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.quizzesService.upsert(req.user.id, payload.id, payload);
  }

  @UseGuards(JwtAccessGuard)
  @Post(":id/publish")
  async publish(
    @Param("id") id: string,
    @Body() payload: PublishQuizPayloadDTO,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.quizzesService.publishQuiz(req.user.id, id, payload);
  }

  @UseGuards(OptionalJwtAccessGuard)
  @Get(":id/playable")
  async findPlayable(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    const userId = user ? user.id : null;
    return this.quizzesService.getPlayableQuiz(userId, id);
  }

  @UseGuards(JwtAccessGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    await this.quizzesService.deleteQuiz(req.user.id, id);
  }
}
