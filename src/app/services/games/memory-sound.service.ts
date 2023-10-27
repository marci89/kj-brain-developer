import { Injectable } from '@angular/core';
import { MemorySoundModel, MemorySoundSettingsModel } from 'src/app/interfaces/games/memory-sound.interface';

@Injectable({
  providedIn: 'root'
})
export class MemorySoundService {

//private settings model object
private settings: MemorySoundSettingsModel = {} as MemorySoundSettingsModel;
memorySoundModels: MemorySoundModel[] = [];

constructor() {
  this.initMemorySoundModel()
}

//Read settings
readSettings() {
  return this.settings;
}

//update settings
setSettings(request: MemorySoundSettingsModel) {
  this.settings = request;
}

//Get sounds
listMemorySoundModel() {
  return this.memorySoundModels;
}

//Get memory sound model by id
readMemorySoundModelById(id: number) {
  return this.memorySoundModels.find(x => x.id === id);
}

  //Init sound models
  initMemorySoundModel() {
    const animal: MemorySoundModel = {
      id: 1,
      name: "Animal",
      voices: [
        {
          id: 1,
          name: "Bird"
        },
        {
          id: 2,
          name: "Pig"
        },
        {
          id: 3,
          name: "Cat"
        }
      ],
    };

    const bird: MemorySoundModel = {
      id: 2,
      name: "Bird",
      voices: [
        {
          id: 1,
          name: "Cat"
        },
        {
          id: 2,
          name: "Owl"
        },
        {
          id: 3,
          name: "Eagle"
        }
      ],
    };

    const farm: MemorySoundModel = {
      id: 3,
      name: "Farm",
      voices: [
        {
          id: 1,
          name: "Chicken"
        },
        {
          id: 2,
          name: "Sheep"
        },
        {
          id: 3,
          name: "Horse"
        }
      ],
    };

    const human: MemorySoundModel = {
      id: 4,
      name: "Human",
      voices: [
        {
          id: 1,
          name: "Why"
        },
        {
          id: 2,
          name: "Yes"
        },
        {
          id: 3,
          name: "No"
        }
      ],
    };

    const instrument: MemorySoundModel = {
      id: 5,
      name: "Instrument",
      voices: [
        {
          id: 1,
          name: "Guitar"
        },
        {
          id: 2,
          name: "Piano"
        },
        {
          id: 3,
          name: "Cat"
        }
      ],
    };

    const pet: MemorySoundModel = {
      id: 6,
      name: "Pet",
      voices: [
        {
          id: 1,
          name: "GuineaPig"
        },
        {
          id: 2,
          name: "Dog"
        },
        {
          id: 3,
          name: "Cat"
        }
      ],
    };

    this.memorySoundModels.push(animal);
    this.memorySoundModels.push(bird);
    this.memorySoundModels.push(farm);
    this.memorySoundModels.push(human);
    this.memorySoundModels.push(instrument);
    this.memorySoundModels.push(pet);
  }
}
