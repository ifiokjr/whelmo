export enum AttachmentType {
  URL = 'url',
  Image = 'image',
  Note = 'note',
}

export interface Attachment {
  type: 'url' | 'image' | 'note';
}

/**
 * A note is the fundamental building block of Whelmo. Everything is done through notes. Notes allow a user to augment content around the web on any public webpage.
 * They serve as annotations and a data layer that sits above the web, and eventually everything around this.
 *
 * Struggling to understand a concept, fire up the app and see if anyone has posted any related content to this screen in the past.
 *
 * TODO: How do questions fit into this. If I see something I'm unsure of how do I ask the community for help in answering this. Are questions fundamentally different from notes or are they just an augmentation on top of notes
 */
export interface NoteInterface {
  /**
   * Notes can be standalone or can the attached to a url, another note an object within a note, an image, a URL etc...
   */
  attachedTo: string;
}
