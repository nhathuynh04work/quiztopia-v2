import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import { QuizzesRetrievalService } from "./retrieval/quizzes-retrieval.service";
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard";
import { GetQuizzesQueryDTO, UpsertQuizDTO } from "./schemas/quiz.schema";
import { CursorPaginationQueryDTO } from "../common/schemas/cursor-pagination.schema";
import type { AuthenticatedRequest } from "../auth/auth.type";

@Controller("quizzes")
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly quizzesRetrievalService: QuizzesRetrievalService,
  ) {}

  @UseGuards(JwtAccessGuard)
  @Get()
  async findQuizzesOfUser(
    @Req() req: AuthenticatedRequest,
    @Query() query: GetQuizzesQueryDTO,
  ) {
    return this.quizzesRetrievalService.getQuizListItemsOfUser(
      req.user.id,
      query,
    );
  }

  @Get("discover")
  async findQuizzesForDiscover(@Query() query: CursorPaginationQueryDTO) {
    return this.quizzesRetrievalService.getQuizListItemsForDiscover(query);
  }

  @Get(":id")
  async findForDrawer(@Param("id") id: string) {
    return this.quizzesRetrievalService.getQuizForDrawer(id);
  }

  @UseGuards(JwtAccessGuard)
  @Get(":id/edit")
  async findForEditor(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    return this.quizzesRetrievalService.getQuizForEditor(req.user.id, id);
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
    @Body() payload: UpsertQuizDTO,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.quizzesService.publishQuiz(req.user.id, id, payload);
  }

  @UseGuards(JwtAccessGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    await this.quizzesService.deleteQuiz(req.user.id, id);
  }
}
