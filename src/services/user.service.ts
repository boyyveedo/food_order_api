import { error } from "console";
import { Iuser, User } from "../model/user.model";
import bcrypt from 'bcrypt';

export async function createUser(userData: Partial<Iuser>): Promise<Iuser | null> {
    try {
        const { fullName, email, password, role } = userData;

        // Check if the user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password as string, 8);

        // Create and save the new user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role
        });

        console.log("User", newUser);

        // Return the created user
        return newUser;

    } catch (error) {
        console.error('Error creating user:', (error as Error).message);
        return null;
    }
}


export async function loginUser(userData: Partial<Iuser>): Promise<Iuser | null> {
    try {
        const { email, password } = userData
        const userFound = await User.findOne({ email })
        if (!userFound) {
            throw new Error('invalid credentials, please login');
        }
        const isPasswordMatched = await bcrypt.compare(password || '', userFound.password || '')
        if (!isPasswordMatched) {
            throw new Error('invalid credentials, please login');
        }

        return userFound
    } catch (error) {
        console.error('Error logging user:', (error as Error).message);
        return null
    }


}


export async function getUserById(userId: string): Promise<Iuser | null> {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log(`No user found with id: ${userId}`);
            return null;
        }
        return user;
    } catch (error) {
        console.error(`Error fetching user with id: ${userId}`, error);
        throw error;
    }
}


export async function getAllUsers(): Promise<Iuser[]> {
    try {
        const user = await User.find({});
        if (!user) {
            throw new Error("cant find all users")

        }
        return user

    } catch (error) {
        console.log("internal server error")
        throw error;
    }
}

export async function updateUser(userId: string, updateData: Partial<Iuser>): Promise<Iuser | null> {
    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, updateData, {
            runValidators: true,
            new: true,
        })
        if (!user) {
            throw new Error("failed to update")
        }
        return user

    } catch (error) {
        console.log("internal server error")
        throw error;

    }
}


export async function deleteUser(userId: string): Promise<Iuser | null> {
    try {
        const user = await User.findByIdAndDelete({ _id: userId })
        if (!user) {
            throw new Error("failed to delete user")
        }
        return user

    } catch (error) {
        console.log("internal server error")
        throw error;

    }
}