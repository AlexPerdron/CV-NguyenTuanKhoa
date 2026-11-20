lucide.createIcons();

function fireGraduationConfetti() {
  if (typeof confetti === 'undefined') return;
  const colors = ['#2c4b85', '#e5d5b7', '#ffffff', '#7b2cbf'];

  confetti({
    particleCount: 55,
    spread: 70,
    origin: { y: 0.65 },
    colors: colors,
  });
}

window.addEventListener('load', () => {
  setTimeout(() => {
    fireGraduationConfetti();
  }, 650);
});

document.getElementById('confettiBtn').addEventListener('click', () => {
  fireGraduationConfetti();
  showToast('Chúc mừng tốt nghiệp nghennnnnn');
});

// Tilt card effect
const card = document.getElementById('invitationCard');
const baseRotation = -2.8;

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -6;
  const rotateY = ((x - centerX) / centerX) * 6;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(-0.5deg) scale(1.015)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = `rotateX(0deg) rotateY(0deg) rotateZ(${baseRotation}deg) scale(1)`;
});

const guestNameDisplay = document.getElementById('guestNameDisplay');
const guestInput = document.getElementById('guestInput');
const rsvpNameInput = document.getElementById('rsvpName');
const guestNameTrigger = document.getElementById('guestNameTrigger');
const editGuestTopBtn = document.getElementById('editGuestTopBtn');
const guestEditIcon = document.getElementById('guestEditIcon');

const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('guest') || urlParams.get('to');
const isAdminEditMode =
  urlParams.get('edit') === '1' || urlParams.get('admin') === '1';

function updateGuestEditVisibility(hasPresetGuest) {
  const canEdit = isAdminEditMode || !hasPresetGuest;

  if (canEdit) {
    editGuestTopBtn.classList.remove('hidden');
    guestEditIcon?.classList.remove('hidden');
    guestNameTrigger.classList.add('cursor-pointer');
    guestNameTrigger.classList.remove('cursor-default', 'pointer-events-none');
    guestNameTrigger.disabled = false;
  } else {
    editGuestTopBtn.classList.add('hidden');
    guestEditIcon?.classList.add('hidden');
    guestNameTrigger.classList.remove('cursor-pointer');
    guestNameTrigger.classList.add('cursor-default', 'pointer-events-none');
    guestNameTrigger.disabled = true;
  }
}

function setGuestName(name, isPreset = false) {
  const cleanName = (name || '').trim();
  const hasName = Boolean(cleanName);
  const finalName = hasName ? cleanName.toUpperCase() : 'ABC';

  guestNameDisplay.textContent = finalName;
  guestInput.value = hasName ? finalName : '';
  if (hasName) {
    rsvpNameInput.value = finalName;
  }

  updateGuestEditVisibility(isPreset || hasName);
}

if (guestParam) {
  setGuestName(guestParam, true);
} else {
  updateGuestEditVisibility(false);
}

guestNameTrigger.addEventListener('click', () => {
  if (!guestNameTrigger.disabled) {
    openModal('guestModal');
  }
});

editGuestTopBtn.addEventListener('click', () => openModal('guestModal'));

document.getElementById('guestForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const newName = guestInput.value.trim();
  setGuestName(newName, Boolean(newName));

  const url = new URL(window.location);
  if (newName) {
    url.searchParams.set('guest', newName);
  } else {
    url.searchParams.delete('guest');
  }
  window.history.replaceState({}, '', url);

  closeModal('guestModal');
  showToast(`Đã cập nhật tên khách mời: ${guestNameDisplay.textContent}`);
});

document.getElementById('copyShareLinkBtn').addEventListener('click', () => {
  const currentName = guestInput.value.trim() || guestNameDisplay.textContent;
  const shareUrl = new URL(window.location.href);
  if (currentName && currentName !== 'ABC') {
    shareUrl.searchParams.set('guest', currentName);
  }
  copyToClipboard(shareUrl.toString());
  showToast('Đã sao chép đường dẫn thiệp mời!');
});

const eventDetails = {
  title: 'Lễ Tốt Nghiệp - Nguyễn Tuấn Khoa',
  start: '20261029T100000', // 10:00 ngày 29/10/2026
  end: '20261029T130000', // 13:00 ngày 29/10/2026
  location:
    'Hội trường Trần Chí Đáo, Nhà điều hành Đại học Quốc gia TP.HCM, Phường Linh Trung, Thủ Đức, TP.HCM',
  description:
    'Trân trọng kính mời tham dự Lễ Tốt Nghiệp của Nguyễn Tuấn Khoa (SĐT: 090-980-1582).',
};

const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&ctz=Asia/Ho_Chi_Minh`;
document.getElementById('googleCalLink').href = gCalUrl;

const dateTimeBox = document.getElementById('dateTimeBox');
dateTimeBox.addEventListener('click', () => openModal('calendarModal'));
dateTimeBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openModal('calendarModal');
  }
});

document.getElementById('contactTrigger').addEventListener('click', () => {
  openModal('contactModal');
});

document.getElementById('copyPhoneBtn').addEventListener('click', () => {
  copyToClipboard('0909801582');
  closeModal('contactModal');
  showToast('Đã sao chép số điện thoại: 090-980-1582');
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('[data-close-modal]');
  if (closeBtn) {
    closeModal(closeBtn.getAttribute('data-close-modal'));
    return;
  }

  if (e.target.classList.contains('modal-backdrop')) {
    closeModal(e.target.id);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.flex').forEach((modal) => {
      closeModal(modal.id);
    });
  }
});

document.querySelectorAll('[data-close-modal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    closeModal(btn.getAttribute('data-close-modal'));
  });
});

document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal(backdrop.id);
    }
  });
});

function copyToClipboard(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  toastMsg.textContent = message;

  toast.classList.remove('opacity-0', 'translate-y-3');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-3');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3400);
}
