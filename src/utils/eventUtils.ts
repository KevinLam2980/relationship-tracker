export const getEventLabel = (type: string) => {
    switch (type) {
      case 'nice':
        return 'Was Nice to Me';
      case 'mean':
        return 'Was Mean to Me';
      case 'argument':
        return 'We Had an Argument';
      case 'gift':
        return 'Gave Me a Gift';
      case 'food':
        return 'Bought Me Food';
      case 'intercourse':
        return 'Intercourse';
      default:
        return type;
    }
  };
  
  export const getEventIcon = (type: string) => {
    switch (type) {
      case 'nice':
        return '😊';
      case 'mean':
        return '😠';
      case 'argument':
        return '🗣️';
      case 'gift':
        return '🎁';
      case 'food':
        return '🍽️';
      case 'intercourse':
        return '❤️';
      default:
        return '';
    }
  };