// @flow
import React, { Suspense, lazy } from 'react';
import { withRouter } from 'react-router';
import * as MODALS from 'constants/modal_types';
import LoadingBar from 'react-top-loading-bar';

const ModalError = lazy(() => import('modal/modalError'));
const ModalDownloading = lazy(() => import('modal/modalDownloading'));
const ModalAutoGenerateThumbnail = lazy(() => import('modal/modalAutoGenerateThumbnail'));
const ModalAutoUpdateDownloaded = lazy(() => import('modal/modalAutoUpdateDownloaded'));
const ModalUpgrade = lazy(() => import('modal/modalUpgrade'));
const ModalFirstReward = lazy(() => import('modal/modalFirstReward'));
const ModalRemoveFile = lazy(() => import('modal/modalRemoveFile'));
const ModalTransactionFailed = lazy(() => import('modal/modalTransactionFailed'));
const ModalFileTimeout = lazy(() => import('modal/modalFileTimeout'));
const ModalAffirmPurchase = lazy(() => import('modal/modalAffirmPurchase'));
const ModalRevokeClaim = lazy(() => import('modal/modalRevokeClaim'));
const ModalPhoneCollection = lazy(() => import('modal/modalPhoneCollection'));
const ModalFirstSubscription = lazy(() => import('modal/modalFirstSubscription'));
const ModalConfirmTransaction = lazy(() => import('modal/modalConfirmTransaction'));
const ModalSocialShare = lazy(() => import('modal/modalSocialShare'));
const ModalSendTip = lazy(() => import('modal/modalSendTip'));
const ModalPublish = lazy(() => import('modal/modalPublish'));
const ModalPublishPreview = lazy(() => import('modal/modalPublishPreview'));
const ModalOpenExternalResource = lazy(() => import('modal/modalOpenExternalResource'));
const ModalConfirmThumbnailUpload = lazy(() => import('modal/modalConfirmThumbnailUpload'));
const ModalWalletEncrypt = lazy(() => import('modal/modalWalletEncrypt'));
const ModalWalletDecrypt = lazy(() => import('modal/modalWalletDecrypt'));
const ModalWalletUnlock = lazy(() => import('modal/modalWalletUnlock'));
const ModalRewardCode = lazy(() => import('modal/modalRewardCode'));
const ModalPasswordUnsave = lazy(() => import('modal/modalPasswordUnsave'));
const ModalCommentAcknowledgement = lazy(() => import('modal/modalCommentAcknowledgement'));
const ModalYoutubeWelcome = lazy(() => import('modal/modalYoutubeWelcome'));
const ModalSetReferrer = lazy(() => import('modal/modalSetReferrer'));
const ModalSignOut = lazy(() => import('modal/modalSignOut'));
const ModalSupportsLiquidate = lazy(() => import('modal/modalSupportsLiquidate'));
const ModalConfirmAge = lazy(() => import('modal/modalConfirmAge'));
const ModalFileSelection = lazy(() => import('modal/modalFileSelection'));
const ModalSyncEnable = lazy(() => import('modal/modalSyncEnable'));
const ModalImageUpload = lazy(() => import('modal/modalImageUpload'));
const ModalMobileSearch = lazy(() => import('modal/modalMobileSearch'));
const ModalViewImage = lazy(() => import('modal/modalViewImage'));
const ModalMassTipsUnlock = lazy(() => import('modal/modalMassTipUnlock'));
const ModalRemoveBtcSwapAddress = lazy(() => import('modal/modalRemoveBtcSwapAddress'));

type Props = {
  modal: { id: string, modalProps: {} },
  error: { message: string },
  location: { pathname: string },
  hideModal: () => void,
};

function ModalRouter(props: Props) {
  const { modal, error, location, hideModal } = props;
  const { pathname } = location;
  const loadingBarRef = React.useRef(null);

  React.useEffect(() => {
    hideModal();
  }, [pathname, hideModal]);

  React.useEffect(() => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
  });

  if (error) {
    return <ModalError {...error} />;
  }

  if (!modal) {
    return null;
  }

  const { id, modalProps } = modal;
  let inner;

  switch (id) {
    case MODALS.UPGRADE:
      inner = <ModalUpgrade {...modalProps} />;
      break;
    case MODALS.DOWNLOADING:
      inner = <ModalDownloading {...modalProps} />;
      break;
    case MODALS.AUTO_GENERATE_THUMBNAIL:
      inner = <ModalAutoGenerateThumbnail {...modalProps} />;
      break;
    case MODALS.AUTO_UPDATE_DOWNLOADED:
      inner = <ModalAutoUpdateDownloaded {...modalProps} />;
      break;
    case MODALS.ERROR:
      inner = <ModalError {...modalProps} />;
      break;
    case MODALS.FILE_TIMEOUT:
      inner = <ModalFileTimeout {...modalProps} />;
      break;
    case MODALS.FIRST_REWARD:
      inner = <ModalFirstReward {...modalProps} />;
      break;
    case MODALS.TRANSACTION_FAILED:
      inner = <ModalTransactionFailed {...modalProps} />;
      break;
    case MODALS.CONFIRM_FILE_REMOVE:
      inner = <ModalRemoveFile {...modalProps} />;
      break;
    case MODALS.AFFIRM_PURCHASE:
      inner = <ModalAffirmPurchase {...modalProps} />;
      break;
    case MODALS.CONFIRM_CLAIM_REVOKE:
      inner = <ModalRevokeClaim {...modalProps} />;
      break;
    case MODALS.PHONE_COLLECTION:
      inner = <ModalPhoneCollection {...modalProps} />;
      break;
    case MODALS.FIRST_SUBSCRIPTION:
      inner = <ModalFirstSubscription {...modalProps} />;
      break;
    case MODALS.SEND_TIP:
      inner = <ModalSendTip {...modalProps} />;
      break;
    case MODALS.SOCIAL_SHARE:
      inner = <ModalSocialShare {...modalProps} />;
      break;
    case MODALS.PUBLISH:
      inner = <ModalPublish {...modalProps} />;
      break;
    case MODALS.PUBLISH_PREVIEW:
      inner = <ModalPublishPreview {...modalProps} />;
      break;
    case MODALS.CONFIRM_EXTERNAL_RESOURCE:
      inner = <ModalOpenExternalResource {...modalProps} />;
      break;
    case MODALS.CONFIRM_TRANSACTION:
      inner = <ModalConfirmTransaction {...modalProps} />;
      break;
    case MODALS.CONFIRM_THUMBNAIL_UPLOAD:
      inner = <ModalConfirmThumbnailUpload {...modalProps} />;
      break;
    case MODALS.WALLET_ENCRYPT:
      inner = <ModalWalletEncrypt {...modalProps} />;
      break;
    case MODALS.WALLET_DECRYPT:
      inner = <ModalWalletDecrypt {...modalProps} />;
      break;
    case MODALS.WALLET_UNLOCK:
      inner = <ModalWalletUnlock {...modalProps} />;
      break;
    case MODALS.WALLET_PASSWORD_UNSAVE:
      inner = <ModalPasswordUnsave {...modalProps} />;
      break;
    case MODALS.REWARD_GENERATED_CODE:
      inner = <ModalRewardCode {...modalProps} />;
      break;
    case MODALS.COMMENT_ACKNOWEDGEMENT:
      inner = <ModalCommentAcknowledgement {...modalProps} />;
      break;
    case MODALS.YOUTUBE_WELCOME:
      inner = <ModalYoutubeWelcome />;
      break;
    case MODALS.SET_REFERRER:
      inner = <ModalSetReferrer {...modalProps} />;
      break;
    case MODALS.SIGN_OUT:
      inner = <ModalSignOut {...modalProps} />;
      break;
    case MODALS.CONFIRM_AGE:
      inner = <ModalConfirmAge {...modalProps} />;
      break;
    case MODALS.FILE_SELECTION:
      inner = <ModalFileSelection {...modalProps} />;
      break;
    case MODALS.LIQUIDATE_SUPPORTS:
      inner = <ModalSupportsLiquidate {...modalProps} />;
      break;
    case MODALS.IMAGE_UPLOAD:
      inner = <ModalImageUpload {...modalProps} />;
      break;
    case MODALS.SYNC_ENABLE:
      inner = <ModalSyncEnable {...modalProps} />;
      break;
    case MODALS.MOBILE_SEARCH:
      inner = <ModalMobileSearch {...modalProps} />;
      break;
    case MODALS.VIEW_IMAGE:
      inner = <ModalViewImage {...modalProps} />;
      break;
    case MODALS.MASS_TIP_UNLOCK:
      inner = <ModalMassTipsUnlock {...modalProps} />;
      break;
    case MODALS.CONFIRM_REMOVE_BTC_SWAP_ADDRESS:
      inner = <ModalRemoveBtcSwapAddress {...modalProps} />;
      break;
    default:
      inner = null;
  }

  return <Suspense fallback={<LoadingBar color="#f11946" ref={loadingBarRef} />}>{inner}</Suspense>;
}

export default withRouter(ModalRouter);
