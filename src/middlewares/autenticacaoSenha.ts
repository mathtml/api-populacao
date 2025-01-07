import { Request, Response, NextFunction } from 'express';

const autenticarSenhaMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Middleware de autenticação chamado");

  const senha = req.headers['x-senha']; // Obtém a senha do header
  const senhaCorreta = process.env.SENHA_IMPORTACAO; // Obtém a senha do .env

  console.log('Senha recebida:', senha); // Log para verificar a senha recebida
  console.log('Senha correta do .env:', senhaCorreta); // Log para verificar a senha no .env

  if (senha !== senhaCorreta) {
    console.log('Senha incorreta!');
    res.status(403).json({ error: 'Senha incorreta' });
    return; // Impede que o fluxo continue
  }

  next(); // Se a senha estiver correta, passa para o próximo middleware
};

export default autenticarSenhaMiddleware;
