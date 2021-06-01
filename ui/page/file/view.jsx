// @flow
import * as React from 'react';
import classnames from 'classnames';
import Page from 'component/page';
import * as RENDER_MODES from 'constants/file_render_modes';

const CommentsList = React.lazy(() => import('component/commentsList'));
const Empty = React.lazy(() => import('component/common/empty'));
const FileTitleSection = React.lazy(() => import('component/fileTitleSection'));
const FileRenderDownload = React.lazy(() => import('component/fileRenderDownload'));
const FileRenderInline = React.lazy(() => import('component/fileRenderInline'));
const FileRenderInitiator = React.lazy(() => import('component/fileRenderInitiator'));
const PostViewer = React.lazy(() => import('component/postViewer'));
const RecommendedContent = React.lazy(() => import('component/recommendedContent'));

export const PRIMARY_PLAYER_WRAPPER_CLASS = 'file-page__video-container';

type Props = {
  costInfo: ?{ includesData: boolean, cost: number },
  fileInfo: FileListItem,
  uri: string,
  fetchFileInfo: (string) => void,
  fetchCostInfo: (string) => void,
  setViewed: (string) => void,
  renderMode: string,
  obscureNsfw: boolean,
  isMature: boolean,
  linkedComment: any,
  setPrimaryUri: (?string) => void,
  videoTheaterMode: boolean,
  commentsDisabled: boolean,
};

function FilePage(props: Props) {
  const {
    uri,
    renderMode,
    fetchFileInfo,
    fetchCostInfo,
    setViewed,
    fileInfo,
    obscureNsfw,
    isMature,
    costInfo,
    linkedComment,
    setPrimaryUri,
    videoTheaterMode,
    commentsDisabled,
  } = props;
  const cost = costInfo ? costInfo.cost : null;
  const hasFileInfo = fileInfo !== undefined;
  const isMarkdown = renderMode === RENDER_MODES.MARKDOWN;

  React.useEffect(() => {
    // always refresh file info when entering file page to see if we have the file
    // this could probably be refactored into more direct components now
    // @if TARGET='app'
    if (!hasFileInfo) {
      fetchFileInfo(uri);
    }
    // @endif

    // See https://github.com/lbryio/lbry-desktop/pull/1563 for discussion
    fetchCostInfo(uri);
    setViewed(uri);
    setPrimaryUri(uri);

    return () => {
      setPrimaryUri(null);
    };
  }, [uri, hasFileInfo, fetchFileInfo, fetchCostInfo, setViewed, setPrimaryUri]);

  function renderFilePageLayout() {
    if (RENDER_MODES.FLOATING_MODES.includes(renderMode)) {
      return (
        <React.Suspense fallback={null}>
          <div className={PRIMARY_PLAYER_WRAPPER_CLASS}>
            <FileRenderInitiator uri={uri} videoTheaterMode={videoTheaterMode} />
          </div>
          {/* playables will be rendered and injected by <FileRenderFloating> */}
        </React.Suspense>
      );
    }

    if (RENDER_MODES.UNRENDERABLE_MODES.includes(renderMode)) {
      return (
        <React.Suspense fallback={null}>
          <FileTitleSection uri={uri} />
          <FileRenderDownload uri={uri} isFree={cost === 0} />
        </React.Suspense>
      );
    }

    if (isMarkdown) {
      return (
        <React.Suspense fallback={null}>
          <PostViewer uri={uri} />;
        </React.Suspense>
      );
    }

    if (RENDER_MODES.TEXT_MODES.includes(renderMode)) {
      return (
        <React.Suspense fallback={null}>
          <FileTitleSection uri={uri} />
          <FileRenderInitiator uri={uri} />
          <FileRenderInline uri={uri} />
        </React.Suspense>
      );
    }

    return (
      <React.Suspense fallback={null}>
        <FileRenderInitiator uri={uri} videoTheaterMode={videoTheaterMode} />
        <FileRenderInline uri={uri} />
        <FileTitleSection uri={uri} />
      </React.Suspense>
    );
  }

  if (obscureNsfw && isMature) {
    return (
      <Page>
        <React.Suspense fallback={null}>
          <FileTitleSection uri={uri} isNsfwBlocked />
        </React.Suspense>
      </Page>
    );
  }

  return (
    <Page className="file-page" filePage isMarkdown={isMarkdown}>
      <React.Suspense fallback={null}>
        <div className={classnames('section card-stack', `file-page__${renderMode}`)}>
          {renderFilePageLayout()}

          {!isMarkdown && (
            <div className="file-page__secondary-content">
              <div>
                {RENDER_MODES.FLOATING_MODES.includes(renderMode) && <FileTitleSection uri={uri} />}
                {commentsDisabled && <Empty text={__('The creator of this content has disabled comments.')} />}
                {!commentsDisabled && <CommentsList uri={uri} linkedComment={linkedComment} />}
              </div>
              {videoTheaterMode && <RecommendedContent uri={uri} />}
            </div>
          )}
        </div>

        {!isMarkdown && !videoTheaterMode && <RecommendedContent uri={uri} />}
        {isMarkdown && (
          <div className="file-page__post-comments">
            <CommentsList uri={uri} linkedComment={linkedComment} />
          </div>
        )}
      </React.Suspense>
    </Page>
  );
}

export default FilePage;
