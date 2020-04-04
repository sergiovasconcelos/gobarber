import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      provider: Yup.boolean(),
      password: Yup.string().required().min(6).max(30),
    });

    if(!await schema.isValid(req, body)){
      return res.status(400).json({ error: 'Data validation failed' });
    }

    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(401).json({ error: 'User email already exists' });
    }

    const { id, name, provider, email, password_hash } = await User.create(
      req.body
    );
    return res.status(200).json({
      id,
      name,
      email,
      provider,
      password_hash,
    });
  }

  async update(req, res) {
    const { email, oldpassword } = req.body;

    const user = await User.findByPk(req.userId);
    if(email && email !== user.email){
      if(await User.findOne({where:{ email }})){
        return res.status(400).jason({ error: 'This email already exists' });
      }
      if(oldpassword && !(await user.checkPassword(oldpassword)))
        return res.status(400).json({ error: 'Password does not match'});
    }
    const {id, name} = await user.update(req.body);

    return res.status(200).jason({ id, name });
  }

  async show(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new UserController();
