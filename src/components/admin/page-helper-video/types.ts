export interface IVideo {
  video_id: string;
  name?: string;
  articles?: {
    name: string;
    url: string;
  }[];
}

export interface PageHelperVideoProps {
  video: IVideo;
}

export interface PageHelperVideoModalProps {
  title?: string;
  supportTitle?: string;
}
