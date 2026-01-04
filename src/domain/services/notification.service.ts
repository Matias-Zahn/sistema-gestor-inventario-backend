export abstract class NotificationService{
    public abstract notify(message: string): Promise<boolean>;
}