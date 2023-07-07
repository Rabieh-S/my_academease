import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) { }

  findAll() {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`L'email ${email} n'existe pas`)
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`L'utilisateur n'existe pas`)
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  // problème de duplication de profile à gérer
  async createUserProfile(id: string, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: id }, relations: ['profile'] });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    const newProfile = this.profileRepository.create(createProfileDto);
    newProfile.user = user;
    const savedProfile = await this.profileRepository.save(newProfile)
    return savedProfile;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const hashedPassword = await encodePassword(createUserDto.password);
    user.email = createUserDto.email;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`utilisateur n'existe pas`);
    }
    return this.userRepository.save(user);
  }

}
