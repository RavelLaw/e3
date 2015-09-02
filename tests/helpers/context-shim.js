export default function() {
  return {
    getType() {
      return 'svg';
    },
    register() {
      return true;
    },
    addToQueue() {
      return true;
    },
    updateMeta() {
      return true;
    },
    removeMeta() {
      return true;
    }
  };
}
