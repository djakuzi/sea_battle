export default function audioOnOff(el): void {
  try {
    function handleMouseAudio():void {
      if (el) {
        el.play()
          .then(() => {
            el.muted = true;
            document.removeEventListener('click', handleMouseAudio);
          })
          .catch((error) => {
            if (error.name === 'NotAllowedError') {
              console.error("The music doesn't work. Reason: Error: Аuto-playback is blocked. User interaction is required.");
            } else {
              console.error("The music doesn't work. Error:", error);
            }
          }
        );
      } else {
        console.error("The music doesn't work. Error: background music not found");
      }
    }

    document.addEventListener('click', handleMouseAudio);
  } catch (e) {
    console.error(e);
  }
}
