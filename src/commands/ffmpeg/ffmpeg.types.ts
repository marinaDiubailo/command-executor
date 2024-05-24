import { ICommandExec } from '../../core/executor/command.types'

export interface IFfmpegInput {
  path: string
  name: string
  width: number
  height: number
}

export interface ICommandExecFfmpeg extends ICommandExec {
  output: string
}
