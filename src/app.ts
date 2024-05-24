import { PromptService } from './core/prompt/prompt.service'

export class App {
  async run(): Promise<void> {
    const res = await new PromptService().input<number>('Число', 'number')

    console.log(res)
  }
}

const app = new App()
app.run()
