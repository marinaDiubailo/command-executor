import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { CommandExecutor } from '../../core/executor/command.executor'
import { IStreamLogger } from '../../core/handlers/stream-logger.interface'
import { IFfmpegInput, ICommandExecFfmpeg } from './ffmpeg.types'
import { FileService } from '../../core/files/files.service'
import { PromptService } from '../../core/prompt/prompt.service'
import { FfmpegBuilder } from './ffmpeg.builder'
import { StreamHandler } from '../../core/handlers/stream.handler'

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService()
  private promptService: PromptService = new PromptService()

  constructor(logger: IStreamLogger) {
    super(logger)
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>('Ширина', 'number')
    const height = await this.promptService.input<number>('Высота', 'number')
    const path = await this.promptService.input<string>('Путь до файла', 'input')
    const name = await this.promptService.input<string>('Имя', 'input')

    return { width, height, path, name }
  }

  protected build({ path, name, width, height }: IFfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(path, name, 'mp4')
    const args = new FfmpegBuilder().input(path).setVideoSize(width, height).output(output)
    return { command: 'ffmpeg', args, output }
  }

  protected spawn({
    command: commmand,
    args,
    output
  }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output)
    return spawn(commmand, args)
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger)
    handler.processOutput(stream)
  }
}
