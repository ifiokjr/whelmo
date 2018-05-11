declare module 'react-native-zss-rich-text-editor' {
  import { Component, RefObject } from 'react';
  import { StyleProp, ViewStyle } from 'react-native';
  export interface RichTextEditorProps {
    /** HTML that will be rendered in the title section as soon as the component loads. */
    initialTitleHTML?: string;
    /** HTML that will be rendered in the content section on load. */
    initialContentHTML?: string;
    /** Text that will be used as a placeholder when no text is present in the title section. */
    titlePlaceholder?: string;
    /** Text that will be used as a placeholder when no text is present in the content section. */
    contentPlaceholder?: string;
    /** Any custom CSS styles that you want to inject to the editor. */
    customCSS?: string;
    /** A function that will be called when the editor has been initialized. */
    editorInitializedCallback?(): void;
  }

  export interface ImageAttributes {
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt?: string;
    /**
     * Retrieves whether the object is fully loaded.
     */
    crossOrigin?: string | null;
    decoding?: 'async' | 'sync' | 'auto';
    /**
     * Sets or retrieves the height of the object.
     */
    height?: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: number;
    style?: string;
  }

  export class RichTextEditor extends Component<RichTextEditorProps> {
    public setBold(): void;
    public setItalic(): void;
    public setUnderline(): void;
    public heading1(): void;
    public heading2(): void;
    public heading3(): void;
    public heading4(): void;
    public heading5(): void;
    public heading6(): void;
    public setParagraph(): void;
    public removeFormat(): void;
    public alignLeft(): void;
    public alignCenter(): void;
    public alignRight(): void;
    public alignFull(): void;
    public insertBulletsList(): void;
    public insertOrderedList(): void;
    public insertLink(url: string, title: string): void;
    public updateLink(url: string, title: string): void;
    public insertImage(attributes: ImageAttributes): void;
    public setSubscript(): void;
    public setSuperscript(): void;
    public setStrikethrough(): void;
    public setHR(): void;
    public setIndent(): void;
    public setOutdent(): void;
    public setBackgroundColor(color: string): void;
    public setTextColor(color: string): void;
    public showLinkDialog(optionalTitle: string, optionalUrl: string): void;
    public setTitlePlaceholder(placeholder: string): void;
    public setContentPlaceholder(placeholder: string): void;
    public setCustomCSS(css: string): void;
    public setTitleHTML(html: string): void;
    public setContentHTML(html: string): void;
    public prepareInsert(): void;
    public restoreSelection(): void;
    public getTitleHtml(): Promise<string>;
    public getTitleText(): Promise<string>;
    public getContentHtml(): Promise<string>;
    public getSelectedText(): Promise<string>;
    public focusTitle(): void;
    public focusContent(): void;
    public blurTitleEditor(): void;
    public blurContentEditor(): void;
    public setTitleFocusHandler(handler: () => void): void;
    public setContentFocusHandler(handler: () => void): void;
    public registerToolbar(
      listener: (items: Array<Action | string>) => void,
    ): void;
  }

  export type Action =
    | 'SET_TITLE_HTML'
    | 'SET_CONTENT_HTML'
    | 'GET_TITLE_HTML'
    | 'GET_TITLE_TEXT'
    | 'GET_CONTENT_HTML'
    | 'GET_SELECTED_TEXT'
    | 'BLUR_TITLE_EDITOR'
    | 'BLUR_CONTENT_EDITOR'
    | 'FOCUS_TITLE'
    | 'FOCUS_CONTENT'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'SET_PARAGRAPH'
    | 'REMOVE_FORMAT'
    | 'justifyLeft'
    | 'justifyCenter'
    | 'justifyRight'
    | 'justifyFull'
    | 'unorderedList'
    | 'orderedList'
    | 'INST_LINK'
    | 'UPDATE_LINK'
    | 'INST_IMAGE'
    | 'subscript'
    | 'superscript'
    | 'strikeThrough'
    | 'horizontalRule'
    | 'indent'
    | 'outdent'
    | 'SET_TITLE_PLACEHOLDER'
    | 'SET_CONTENT_PLACEHOLDER'
    | 'SET_TITLE_FOCUS_HANDLER'
    | 'SET_CONTENT_FOCUS_HANDLER'
    | 'PREPARE_INSERT'
    | 'RESTORE_SELECTION'
    | 'SET_CUSTOM_CSS'
    | 'SET_TEXT_COLOR'
    | 'SET_BACKGROUND_COLOR';

  interface ActionsObject {
    readonly setTitleHtml: 'SET_TITLE_HTML';
    readonly setContentHtml: 'SET_CONTENT_HTML';
    readonly getTitleHtml: 'GET_TITLE_HTML';
    readonly getTitleText: 'GET_TITLE_TEXT';
    readonly getContentHtml: 'GET_CONTENT_HTML';
    readonly getSelectedText: 'GET_SELECTED_TEXT';
    readonly blurTitleEditor: 'BLUR_TITLE_EDITOR';
    readonly blurContentEditor: 'BLUR_CONTENT_EDITOR';
    readonly focusTitle: 'FOCUS_TITLE';
    readonly focusContent: 'FOCUS_CONTENT';
    readonly setBold: 'bold';
    readonly setItalic: 'italic';
    readonly setUnderline: 'underline';
    readonly heading1: 'h1';
    readonly heading2: 'h2';
    readonly heading3: 'h3';
    readonly heading4: 'h4';
    readonly heading5: 'h5';
    readonly heading6: 'h6';
    readonly setParagraph: 'SET_PARAGRAPH';
    readonly removeFormat: 'REMOVE_FORMAT';
    readonly alignLeft: 'justifyLeft';
    readonly alignCenter: 'justifyCenter';
    readonly alignRight: 'justifyRight';
    readonly alignFull: 'justifyFull';
    readonly insertBulletsList: 'unorderedList';
    readonly insertOrderedList: 'orderedList';
    readonly insertLink: 'INST_LINK';
    readonly updateLink: 'UPDATE_LINK';
    readonly insertImage: 'INST_IMAGE';
    readonly setSubscript: 'subscript';
    readonly setSuperscript: 'superscript';
    readonly setStrikethrough: 'strikeThrough';
    readonly setHR: 'horizontalRule';
    readonly setIndent: 'indent';
    readonly setOutdent: 'outdent';
    readonly setTitlePlaceholder: 'SET_TITLE_PLACEHOLDER';
    readonly setContentPlaceholder: 'SET_CONTENT_PLACEHOLDER';
    readonly setTitleFocusHandler: 'SET_TITLE_FOCUS_HANDLER';
    readonly setContentFocusHandler: 'SET_CONTENT_FOCUS_HANDLER';
    readonly prepareInsert: 'PREPARE_INSERT';
    readonly restoreSelection: 'RESTORE_SELECTION';
    readonly setCustomCSS: 'SET_CUSTOM_CSS';
    readonly setTextColor: 'SET_TEXT_COLOR';
    readonly setBackgroundColor: 'SET_BACKGROUND_COLOR';
  }

  export const actions: ActionsObject;

  export interface RichTextToolbarProps {
    getEditor(): RefObject<RichTextEditor>['current'];
    actions?: Actions[];
    onPressAddLink?(): void;
    onPressAddImage?(): void;
    selectedButtonStyle?: StyleProp<ViewStyle>;
    iconTint?: string;
    selectedIconTint?: string;
    unselectedButtonStyle?: StyleProp<ViewStyle>;
    renderAction?(action: Action[]): PropTypes.func;
    iconMap?: PropTypes.object;
  }

  export class RichTextToolbar extends Component<RichTextToolbarProps> {}
}
