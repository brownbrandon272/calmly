export interface Sound {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
}

export const getSounds = (): Sound[] => {
  return [
    {
      id: '1',
      name: 'Rain',
      description: 'Gentle rainfall on a quiet afternoon',
      audioUrl: 'https://ia800203.us.archive.org/28/items/nature-sounds-for-relaxation-1/rain.mp3',
      imageUrl: 'https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: 'Ocean',
      description: 'Waves gently crashing on the shore',
      audioUrl: 'https://ia800203.us.archive.org/28/items/nature-sounds-for-relaxation-1/waves.mp3',
      imageUrl: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      name: 'Forest',
      description: 'Birds chirping in a peaceful forest',
      audioUrl: 'https://ia800203.us.archive.org/28/items/nature-sounds-for-relaxation-1/birds.mp3',
      imageUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      name: 'White Noise',
      description: 'Gentle static to help focus and sleep',
      audioUrl: 'https://ia800203.us.archive.org/28/items/nature-sounds-for-relaxation-1/whitenoise.mp3',
      imageUrl: 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      name: 'Creek',
      description: 'Water flowing through a peaceful creek',
      audioUrl: 'https://ia800203.us.archive.org/28/items/nature-sounds-for-relaxation-1/creek.mp3',
      imageUrl: 'https://images.pexels.com/photos/1164985/pexels-photo-1164985.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      name: 'Campfire',
      description: 'Crackling fire under the stars',
      audioUrl: 'https://ia800203.us.archive.org/28/items/nature-sounds-for-relaxation-1/fire.mp3',
      imageUrl: 'https://images.pexels.com/photos/2566774/pexels-photo-2566774.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
};