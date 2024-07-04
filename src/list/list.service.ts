import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  private lists: List[] = [];

  create(createListDto: CreateListDto) {
    const newList = { id: Date.now(), ...createListDto };
    this.lists.push(newList);
    return newList;
  }

  findAll() {
    return this.lists;
  }

  findOne(id: number) {
    return this.lists.find(list => list.id === id);
  }

  update(id: number, updateListDto: UpdateListDto) {
    const listIndex = this.lists.findIndex(list => list.id === id);
    if (listIndex !== -1) {
      this.lists[listIndex] = { ...this.lists[listIndex], ...updateListDto };
      return this.lists[listIndex];
    }
    return null;
  }

  remove(id: number) {
    const listIndex = this.lists.findIndex(list => list.id === id);
    if (listIndex !== -1) {
      const deletedList = this.lists.splice(listIndex, 1);
      return deletedList[0];
    }
    return null;
  }
}
