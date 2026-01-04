import { CustomError, NotificationService } from "../../domain"

export class DiscordService implements NotificationService{

    constructor(
        private readonly DISCORD_WEBHOOK_URL: string
    ){}


    public async notify(message: string): Promise<boolean> {

        const body = {
            content: message
        }

        const resp = await fetch(this.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })


        if(!resp.ok){
            throw CustomError.internalServerError('Something was very wrong to send meesage to Discord')
        }

        return true
    }   

}