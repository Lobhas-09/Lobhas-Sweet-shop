// import { Router } from 'express';
// import { register, login } from '../controllers/auth.controller';
// import { validateRegistration, validateLogin } from '../utils/validators';

// const router = Router();

// // User registration route
// router.post('/register', validateRegistration, register);

// // User login route
// router.post('/login', validateLogin, login);

// export default router;
import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.register(username, password);
    res.status(201).json(user);
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ message: err?.message || 'Register failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err?.message || 'Login failed' });
  }
});

export default router;