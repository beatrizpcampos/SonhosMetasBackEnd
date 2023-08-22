import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const routes = new Router();

const prisma = new PrismaClient();

routes.post("/sonhos", async (request, response) => {
    const { nome } = request.body
    const sonho = await prisma.sonhos.create({
        data: {
            nome,
        },
    });

    return response.status(201).json(sonho);
});

routes.get("/sonhos", async (request, response) => {
    const sonhos = await prisma.sonhos.findMany();
    return response.status(200).json(sonhos);
})

routes.put("/sonhos", async (request, response) => {
    const { nome, id, status } = request.body;

    if (!id) {
        return response.status(400).json("Id Não Encontrado")
    }

    const sonhoJaExiste = await prisma.sonhos.findUnique({ where: { id } })

    if (!sonhoJaExiste) {
        return response.status(404).json("Sonho Não Existe")
    }

    const sonho = await prisma.sonhos.update({
        where: {
            id,
        },
        data: {
            nome,
            status,
        },
    });

    return response.status(200).json(sonho)
});

routes.delete("/sonhos/:id", async (request, response) => {
    const { id } = request.params;

    const intId = parseInt(id)

    if (!intId) {
        return response.status(400).json("Id Não Encontrado");
    }

    const sonhoJaExiste = await prisma.sonhos.findUnique({
        where: { id: intId },
    })

    if (!sonhoJaExiste) {
        return response.status(404).json("Sonho Não Existe")
    }

    await prisma.sonhos.delete({ where: { id: intId } })

    return response.status(200).send()
})

export default routes