import { CustomError } from "../errors/customError";

export class MovementEntity {
  private constructor(
    private readonly productId: string,
    private readonly type: "IN" | "OUT",
    private readonly quantity: number,
    private readonly reason: "VENTA" | "COMPRA" | "AJUSTE" | "DANIADO",
    private readonly createdAt: Date
  ) {}

  public static fromObject(object: { [key: string]: any }) {
    const { productId, type, quantity, reason, createdAt } = object;

    if (!productId)
      throw CustomError.badRequest("El id del producto es necesario");
    if (!type)
      throw CustomError.badRequest("El tipo de movimiento es necesario");
    if (quantity === undefined)
      throw CustomError.badRequest("La cantidad de productos es necesario");
    if (quantity < 0)
      throw CustomError.badRequest(
        "La cantidad del producto debe ser positiva"
      );
    if (!reason)
      throw CustomError.badRequest("La razon del moviemiento es necesario");

    const finalDate = createdAt ? new Date(createdAt) : new Date()    
    
    return new MovementEntity(productId, type, quantity, reason, finalDate)
  }
}
