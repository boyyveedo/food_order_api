import { Request, Response, NextFunction } from 'express';
import { Iuser } from "../model/user.model";
import { createUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser } from '../services/user.service';
import generateToken from '../utils/generateToken';


export async function registerUser(req: Request, res: Response): Promise<Response> {
    try {
        const { email, fullName, password, role } = req.body;
        const newUser = await createUser({ email, fullName, password, role })
        console.log(`newUser in controller: `, newUser)

        // const newUser = await createUser({ email, fullName, password, role });
        // console.log('newUser in controller:', newUser);

        // If newUser is null, it means the user wasn't created (either exists or an error occurred)
        if (!newUser) {
            return res.status(400).json({ msg: 'User already exists or could not be created' });
        }
        return res.status(201).json({ msg: 'User successfully created', user: newUser });
    } catch (error) {
        console.error('Error in registerUser:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });
    }
}


export async function loginUserController(req: Request, res: Response): Promise<Response> {
    try {
        const { email, password, fullName, } = req.body
        const user = await loginUser({ email, password })
        if (!user) {
            return res.status(401).json({ msg: "invalid credentials please login" })
        }
        return res.status(201).json({
            msg: " logged in sucessfully",
            data: {
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user.id.toString(), user.email)

            }
        })
    } catch (error) {
        console.error('Error in loginUser:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });
    }
}



export async function getUserByIdController(req: Request, res: Response): Promise<Response> {
    try {
        const { id: userId } = req.params
        const user = await getUserById(userId)
        if (!user) {
            return res.status(401).json({ msg: "user does not exist" })
        }
        return res.status(201).json({ user })

    } catch (error) {
        console.error('Error in fetching userid:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });

    }
}


export async function getAllUsersController(req: Request, res: Response): Promise<Response> {
    try {

        const users = await getAllUsers()
        if (!users) {
            return res.status(401).json({ msg: "users does not exist" })
        }
        return res.status(201).json({ users })

    } catch (error) {
        console.error('Error in fetching users:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });

    }
}


export async function updateUserController(req: Request, res: Response): Promise<Response> {
    try {
        const { id: userId } = req.params
        const user = await updateUser(userId, req.body)

        if (!user) {
            return res.status(401).json({ msg: "users does not exist" })
        }
        return res.status(201).json({ user })

    } catch (error) {
        console.error('Error in updating users:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });

    }
}

export async function deleteUserController(req: Request, res: Response): Promise<Response> {
    try {
        const { id: userId } = req.params
        const user = await deleteUser(userId)

        if (!user) {
            return res.status(401).json({ msg: "users does not exist" })
        }
        return res.status(201).json({ user })

    } catch (error) {
        console.error('Error in deleting users:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });

    }
}
