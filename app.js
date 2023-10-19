"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const users = [];
// Middleware para verificar a existência do usuário
function checkExistsUserAccount(req, res, next) {
    const username = req.header('username');
    if (!username) {
        return res.status(400).json({ error: 'Cabeçalho "username" ausente ou inválido.' });
    }
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    req.user = user; // Agora o TypeScript reconhecerá a propriedade user
    next();
}
// Rota para criar um novo usuário
app.post('/users', (req, res) => {
    const { name, username } = req.body;
    // Verifique se o usuário com o mesmo `username` já existe
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'Usuário com o mesmo username já existe.' });
    }
    // Crie um novo usuário
    const newUser = {
        id: (0, uuid_1.v4)(),
        name,
        username,
        technologies: [],
    };
    users.push(newUser);
    return res.status(201).json(newUser);
});
// Rota para listar todas as tecnologias de um usuário
app.get('/technologies', checkExistsUserAccount, (req, res) => {
    const user = req.user; // O usuário foi adicionado à solicitação pelo middleware
    return res.status(200).json(user.technologies);
});
// Rota para criar uma nova tecnologia para um usuário
app.post('/technologies', checkExistsUserAccount, (req, res) => {
    const { title, deadline } = req.body;
    const username = req.header('username');
    if (!title || !deadline || !username) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }
    const user = req.user;
    // Formate a data de prazo como uma string ISO
    const newDeadline = new Date(deadline).toISOString();
    // Crie um novo objeto Technology
    const newTechnology = {
        id: (0, uuid_1.v4)(),
        title,
        isStudied: false,
        deadline: newDeadline,
    };
    // Adicione a nova tecnologia à lista de tecnologias do usuário
    user.technologies.push(newTechnology);
    return res.status(201).json(newTechnology);
});
// Rota para atualizar uma tecnologia de um usuário
app.put('/technologies/:id', checkExistsUserAccount, (req, res) => {
    const { title, deadline } = req.body;
    const { id } = req.params;
    const username = req.header('username');
    const user = req.user;
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    // Encontre a tecnologia com o ID correspondente
    const technologyToUpdate = user.technologies.find((tech) => tech.id === id);
    if (!technologyToUpdate) {
        return res.status(404).json({ error: 'Tecnologia não encontrada.' });
    }
    // Atualize o título e o prazo da tecnologia
    if (title) {
        technologyToUpdate.title = title;
    }
    if (deadline) {
        technologyToUpdate.deadline = new Date(deadline).toISOString();
    }
    return res.status(200).json(technologyToUpdate);
});
// Rota para marcar uma tecnologia como estudada
app.patch('/technologies/:id/studied', checkExistsUserAccount, (req, res) => {
    const username = req.header('username');
    if (!username) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    const { id } = req.params;
    const user = req.user;
    const technologyToUpdate = user.technologies.find((tech) => tech.id === id);
    if (!technologyToUpdate) {
        return res.status(404).json({ error: 'Tecnologia não encontrada.' });
    }
    technologyToUpdate.isStudied = true;
    return res.status(200).json(technologyToUpdate);
});
app.delete('/technologies/:id', checkExistsUserAccount, (req, res) => {
    const { id } = req.params;
    const user = req.user;
    // Encontre o índice da tecnologia com o ID especificado
    const technologyIndex = user.technologies.findIndex((tech) => tech.id === id);
    if (technologyIndex === -1) {
        return res.status(404).json({ error: 'Tecnologia não encontrada.' });
    }
    // Remova a tecnologia da lista de tecnologias do usuário
    user.technologies.splice(technologyIndex, 1);
    // Retorna a lista atualizada de tecnologias
    return res.status(200).json(user.technologies);
});
// Outras rotas para gerenciar tecnologias (adicionar, atualizar, marcar como estudado, excluir) por usuário
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
