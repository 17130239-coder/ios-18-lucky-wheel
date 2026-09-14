# 🎡 iOS 18 Lucky Wheel (Vòng Quay May Mắn Công Nghệ)

> **Ứng dụng Vòng Quay May Mắn Đẳng Cấp Hoàng Gia** được thiết kế và phát triển theo triết lý **Apple iOS 18 Liquid Glassmorphism**, tích hợp đồ họa SVG độ nét cao, hiệu ứng mở rèm rạp hát hoàng gia, hệ thống đèn chiếu sân khấu thể tích chân thực, âm thanh tổng hợp thuần túy bằng Web Audio API và cơ chế triệt tiêu giật layout (Zero-Jitter UX).

- 🌐 **Trải nghiệm trực tiếp (Live Production)**: [https://ios-18-lucky-wheel.vercel.app](https://ios-18-lucky-wheel.vercel.app)
- 💻 **Mã nguồn GitHub**: [https://github.com/17130239-coder/ios-18-lucky-wheel](https://github.com/17130239-coder/ios-18-lucky-wheel)

---

## 📑 Mục Lục

1. [Tất Cả Tính Năng (Key Features)](#1-tất-cả-tính-năng-key-features)
2. [Các Cải Tiến Nổi Bật & Tinh Chỉnh UI/UX (Improvements)](#2-các-cải-tiến-nổi-bật--tinh-chỉnh-uiux-improvements)
3. [Quy Tắc & Nguyên Tắc Thiết Kế (Rules & Guidelines)](#3-quy-tắc--nguyên-tắc-thiết-kế-rules--guidelines)
4. [Công Nghệ & Kỹ Thuật Lập Trình (Technologies & Engineering)](#4-công-nghệ--kỹ-thuật-lập-trình-technologies--engineering)
5. [Cấu Trúc Thư Mục Dự Án (Project Structure)](#5-cấu-trúc-thư-mục-dự-án-project-structure)
6. [Hướng Dẫn Cài Đặt & Chạy Dự Án (Getting Started)](#6-hướng-dẫn-cài-đặt--chạy-dự-án-getting-started)

---

## 1. Tất Cả Tính Năng (Key Features)

### 1.1. Động Cơ Vòng Quay SVG Độ Phân Giải Cao (Precision SVG Turntable Engine)
- **Tọa độ & Nan quạt chính xác tuyệt đối**: Tâm $(300, 300)$, bán kính $R = 280\text{px}$, chia đều thành đúng 10 nan quạt ($36^\circ$/ô).
- **Vật lý viền ngoài**:
  - 10 đinh tán kim loại mạ bạc sáng bóng (Metallic Rivet Pins) gắn tại ranh giới các cung nan quạt.
  - 30 đèn LED viền ngoài phản chiếu ánh sáng vòng quanh khung hợp kim nhôm chải xước.
- **Nội dung nan quạt**:
  - Hai dòng chữ tên quà độ tương phản cao, tự động điều chỉnh màu chữ theo sắc độ nền nan quạt (`#FFFFFF` hoặc `#1E293B`).
  - Biểu tượng công nghệ vector sắc nét, đổ bóng 3D nổi bật.

### 1.2. Vật Lý Va Chạm & Kim Chỉ Thông Minh (Physics & Dynamic Needle Deflection)
- **Công thức giảm tốc tự nhiên (Quartic Easing Out)**: Thời gian quay 5 giây với phương trình $E(t) = 1 - (1 - t)^4$, mô phỏng quán tính và ma sát bạc đạn thực tế.
- **Hiệu ứng vẩy kim chỉ (Needle Bounce Deflection)**:
  - Kim chỉ ở vị trí 12h tự động nảy ngược góc $-15^\circ$ mỗi khi đỉnh kim chạm đinh tán trên nan quạt và hồi phục mềm mại.
  - Tần suất nảy biến thiên nhịp nhàng theo vận tốc quay thực tế từ nhanh đến chậm dần.

### 1.3. Âm Thanh Tổng Hợp Thuần Túy Không Cần File MP3 (Procedural Web Audio Engine)
- **100% Native Web Audio API**: Khởi tạo âm thanh tức thì (Zero-Latency), không tốn dung lượng tải file âm thanh ngoài:
  - **Tiếng gõ kim (Tick Sound)**: Sóng âm tam giác (Triangle Wave) 880Hz mô phỏng tiếng cọ xát cơ học giòn giã.
  - **Khởi động quay (Launch Sound)**: Tiếng vù gió tăng tần số từ 120Hz đến 320Hz.
  - **Fanfare chiến thắng (Win Fanfare)**: Hợp âm 4 nốt rực rỡ ($C_5 \rightarrow E_5 \rightarrow G_5 \rightarrow C_6$) kết hợp dải lọc ngân vang.
  - **Hiệu ứng mở màn rạp hát (Curtain Overture)**: Âm thanh quét vải lụa trầm ấm kết hợp tiếng chuông khánh vang vọng.
  - **Âm thanh thủy tinh (Glass Pop)**: Phản hồi khi đóng/mở popup và drawer.

### 1.4. Động Cơ Nhạc Nền Chill Chill Tự Sinh (Procedural Chill BGM Engine)
- **100% Thuần Web Audio API**: Không tải file MP3 ngoài, không tốn băng thông, chạy mượt mà offline và không giới hạn thời lượng phát.
- **3 Phong Cách Giai Điệu Thư Giãn Tuyệt Đối**:
  1. ☕ **Lo-Fi Cafe (64 BPM)**: Hợp âm Rhodes Electric Piano ngọt ngào, tiếng đĩa than vinyl nổ tí tách ấm áp, âm trầm sub-bass analog êm ru.
  2. ✨ **Dreamy Ambient (52 BPM)**: Không gian bồng bềnh lơ lửng, hợp âm Lydian thiền định cùng các giọt chuông sao rơi thánh thót.
  3. 🎷 **Night Lounge (68 BPM)**: Hợp âm Jazz hoàng hôn sang trọng, tiếng bass mộc dìu dặt thư thái.
- **Tính năng Studio-Grade Auto-Ducking**: Tự động hạ âm lượng BGM 65% trong suốt thời gian bánh xe quay để tiếng gõ kim giòn tan nổi bật, sau đó êm dịu tăng trở lại khi dừng quay.
- **Nút Bật/Tắt Nhanh trên Header**: Nút nốt nhạc phát sáng kèm hiệu ứng sóng nhạc equalizer động khi đang phát.
- **Tab Cài Đặt Âm Nhạc Riêng Biệt**: Cho phép chỉnh âm lượng (5% - 100%), đổi phong cách nhạc và bật/tắt Auto-Ducking với thiết kế Zero-Jitter chuẩn iOS 18.

### 1.5. Màn Mở Rèm Sân Khấu Hoàng Gia & Hiệu Ứng Logo Nhập Lại (Grand Stage Curtain Entrance)
- **Rèm nhung 2 cánh dệt 3D**: Gam màu đỏ ruby hoàng gia kết hợp các nếp gấp đổ bóng thể tích sâu và chân thực.
- **Diềm yếm uốn lượn (Scalloped Pelmet)**: Viền mép trên sân khấu lượn sóng cánh cung đính chuông/tua rua cam ấm áp.
- **Logo trên rèm chính là Nút Quay**:
  - Biểu tượng Laptop công nghệ và hào quang rực rỡ đặt ở tâm rèm.
  - **Căn chỉnh tọa độ tuyệt đối 1:1**: Tâm nút rèm và tâm nút quay của bánh xe nằm trùng khít 100% tại $(50vw, 50vh)$.
  - **Hiệu ứng Logo nhập lại (Logo Merge & Docking)**: Khi rèm mở sang hai bên, hai luồng sáng hội tụ về tâm, nút trên rèm mở rộng và hòa tan liền mạch vào nút quay `CenterHub` của vòng quay, không hề bị giật hay lệch vị trí.
- **Tiện ích đi kèm**:
  - Chạm bất kỳ đâu hoặc bấm **"Bỏ qua"** để mở rèm ngay lập tức.
  - Bật/tắt hiệu ứng rèm khi tải trang trong mục Cài Đặt.
  - Nút **"Xem Lại Hiệu Ứng Mở Rèm Sân Khấu 🎭"** cho phép thưởng thức lại màn mở rèm bất cứ lúc nào.

### 1.5. Hệ Thống Đèn Chiếu Sân Khấu Thể Tích & Hạt Bụi 3D (Dual Stage Spotlights & Light Dust)
- **2 đèn pha sân khấu thể tích (Volumetric Beams)**:
  - Bộ lọc SVG đa lớp Gaussian Blur tạo độ loang ánh sáng mượt mà, không gắt laser.
  - **3 chế độ góc chiếu sáng**:
    1. *Chạm Nhẹ Viền Ngoài (Rim Grazing - Khuyên dùng)*: Quét êm ái viền ngoài của bánh xe, tôn vinh khung đĩa mà không làm lóa quà.
    2. *Quét Toàn Sân Khấu (Stage Sweep)*: Đèn quét góc rộng đan chéo toàn cảnh sân khấu.
    3. *Tập Trung Trung Tâm (Center Focus)*: Hai luồng sáng rọi thẳng vào nút quay ở tâm.
- **Chế độ màu ánh sáng đa dạng**:
  - **Chế độ Cầu Vồng RGB (Spectrum)**: Ánh đèn biến đổi dải màu quang phổ tuần hoàn mềm mại.
  - **4 Preset Apple cao cấp**: Vàng Hổ Phách (Amber `#FFA04D`), Tím Neon (Violet `#8B5CF6`), Xanh Băng (Cyan `#00F2FE`), Hồng Neon (Rose `#F43F5E`).
  - **Mã màu tùy ý (Custom Hex Color)**: Cho phép chọn mã màu bất kỳ theo sở thích.
- **Điều chỉnh cường độ**: Thanh trượt độ sáng từ 20% đến 100%.
- **Hạt bụi thể tích 3D (Light Dust)**: 45 hạt bụi lơ lửng ngẫu nhiên phản xạ ánh đèn tạo chiều sâu không gian nhà hát.

### 1.6. Tùy Biến Quà Tặng & Bảng Chọn Biểu Tượng (Prize Management & Icon Picker)
- **Chỉnh sửa toàn diện 10 phần thưởng**: Tùy chỉnh tên dòng 1, tên dòng 2, màu sắc nan quạt và icon đại diện.
- **Bảng chọn biểu tượng trực quan (Icon Picker Modal)**:
  - Hơn 100+ biểu tượng Lucide vector phong phú.
  - Phân loại khoa học theo 4 nhóm: Tất cả, ⚡ Công nghệ, 🏆 Giải thưởng, 🚗 Đời sống.
  - Thanh tìm kiếm thông minh hỗ trợ tìm theo tên hoặc mã icon.
- **Tùy chọn tự động loại bỏ quà đã trúng (Eliminate Won Prizes)**: Tự động gỡ sản phẩm vừa trúng khỏi danh sách để các lượt quay sau không bị trùng.
- **Khôi phục mặc định (Reset to Factory Defaults)**: Đặt lại danh sách 10 phần quà công nghệ Apple & Tech tiêu chuẩn chỉ với 1 chạm.

### 1.7. Trải Nghiệm Chiến Thắng & Lịch Sử Trúng Thưởng (Celebration & History)
- **Pháo hoa Confetti Canvas 2D**: Mô phỏng hàng trăm hạt pháo giấy bung nở ngẫu nhiên với vận tốc, góc bắn, trọng lực và lực cản không khí chân thực.
- **Modal chúc mừng chiến thắng (Victory Modal)**: Hiệu ứng kính mờ Liquid Glass sang trọng hiển thị tên giải thưởng, hình ảnh quà tặng, nút "Nhận Quà" và "Quay Tiếp".
- **Ngăn kéo Lịch Sử (History Drawer)**: Lưu trữ danh sách các phần quà đã quay trúng kèm mốc thời gian chi tiết theo định dạng giờ địa phương.

### 1.8. Hỗ Trợ 2 Giao Diện Sáng / Tối Chuẩn Apple (Dual Theme Engine)
- **Chế độ Sáng (Light Glass)**: Nền titan ấm áp, điểm xuyết sắc cam hổ phách thanh lịch.
- **Chế độ Tối (Dark Glass)**: Nền hắc diện thạch lỏng Obsidian (`#08090C`) kết hợp ánh sáng neon viền nổi bật.

---

## 2. Các Cải Tiến Nổi Bật & Tinh Chỉnh UI/UX (Improvements)

### 2.1. Triệt Tiêu Hoàn Toàn Hiện Tượng Giật UI / Nhảy Layout (Zero-Jitter Architecture)
- **Loại bỏ hiện tượng nhảy pixel khi chọn tùy chọn**:
  - *Vấn đề trước đây*: Khi click chọn giữa các chế độ đèn (Rim / Sweep / Center) hoặc chế độ RGB, badge chữ "Đang chọn" / "Kích hoạt" xuất hiện/biến mất làm thay đổi chiều cao của hàng, khiến toàn bộ danh sách các thẻ bên dưới bị đẩy giật lên/xuống 2-4px.
  - *Giải pháp*: Thay thế việc render badge có điều kiện bằng **khung radio check indicator cố định kích thước `w-5 h-5` (20x20px)** ở góc phải của 100% các thẻ lựa chọn. Khi click chuyển đổi, kích thước thẻ không xê dịch dù chỉ 1 pixel.
- **Ổn định hình học Modal chọn icon**:
  - *Vấn đề trước đây*: Khi chuyển giữa các tab danh mục có số lượng icon khác nhau, chiều cao modal co giãn đột ngột từ 85vh xuống 300px làm modal bị nhảy nảy lên xuống giữa màn hình.
  - *Giải pháp*: Cố định chiều cao modal `h-[80vh] max-h-[600px] min-h-[460px]`, giữ khung cố định vững chãi và chỉ cuộn mượt mà danh sách icon bên trong.
- **Chống giật thanh cuộn (Scrollbar Gutter Lock)**: Tích hợp `[scrollbar-gutter:stable]` vào khung cuộn của ngăn kéo cài đặt và modal biểu tượng, ngăn chặn hiện tượng co giật ngang khi nội dung thay đổi độ dài.
- **Loại bỏ `transition-all` và Scale Subpixel**: Thay thế `transition-all` bằng `transition-colors duration-150`, loại bỏ các hiệu ứng `scale-110` hay `active:scale-95` trên danh sách để chữ không bị rung mờ nét do render subpixel của trình duyệt.
- **Tách thẻ Rèm Sân Khấu thành mục độc lập**: Đưa thẻ Rèm ra ngoài điều kiện bật/tắt đèn sân khấu, giúp người dùng tùy biến rèm mọi lúc mà không làm giao diện biến mất đột ngột.
- **Làm mượt góc chiếu và thanh trượt sáng**: Bổ sung `transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)` cho đèn khi chuyển về tâm, loại bỏ `transition-opacity` cản trở thanh trượt độ sáng để thanh trượt đáp ứng 60fps mượt mà.

### 2.2. Khớp Tọa Độ Tuyệt Đối 1:1 Giữa Logo Rèm và Nút Quay Tâm
- Tách nhãn chú thích bên dưới nút rèm ra khỏi luồng bố cục flexbox bằng định vị tuyệt đối `absolute top-[calc(100%+20px)]`, khóa tâm nút rèm chính xác tại tọa độ $(50vw, 50vh)$.
- Khóa vị trí `CenterHub` và `LuckyWheel` ở trung tâm tuyệt đối màn hình.
- Nhờ đó, khi hai cánh rèm kéo ra, logo trên rèm và nút quay của bánh xe nhập khít vào nhau 100% không lệch một pixel.

### 2.3. Tinh Gọn Bố Cục Danh Sách Quà Tặng 1 Hàng (Single-Row Layout)
- Thu gọn từ bố cục 2 hàng cồng kềnh (20 thẻ phụ cho 10 phần quà) thành **bố cục 1 hàng duy nhất**.
- Tích hợp nút chọn icon dạng ô vuông kính mờ Squircle `w-11 h-11` trực quan ở đầu hàng, bấm trực tiếp để đổi icon, giảm hơn 50% độ cao danh sách cài đặt.

### 2.4. Tương Tác Chuột Tự Nhiên Khi Đang Quay (Non-blocking Cursor UX)
- Loại bỏ thuộc tính `disabled` và con trỏ chuột cấm đoán `cursor-not-allowed` khi vòng quay đang chạy.
- Con trỏ chuột giữ nguyên hình bàn tay tự nhiên (`cursor-pointer`) đồng thời vẫn khóa lệnh gọi quay tiếp (`if (isSpinning) return;`), mang lại cảm giác dễ chịu cho người dùng.

---

## 3. Quy Tắc & Nguyên Tắc Thiết Kế (Rules & Guidelines)

1. **Ngôn Ngữ Thiết Kế Apple iOS 18 Liquid Glassmorphism**:
   - Sử dụng nền kính mờ nhiều tầng `backdrop-blur-2xl`, viền siêu mỏng `border-white/10` (Dark) và `border-stone-200/60` (Light).
   - Đổ bóng mềm nhiều lớp mô phỏng độ nổi của bề mặt gương kính quang học.
2. **Tiêu Chuẩn Phối Màu Dịu Mắt (Soothing Color Palette)**:
   - Không sử dụng các dải màu đỏ máu gắt, màu gradient cầu vồng chói hay độ tương phản quá gay gắt gây mỏi mắt.
   - Sắc cam ấm `#FF6B00` được dùng làm màu nhấn chính (Accent Color) xuyên suốt ứng dụng.
3. **Nguyên Tắc Bất Biến Bố Cục (Layout Immutability Rule)**:
   - Mọi tương tác click chọn option, đổi chế độ, gõ văn bản không bao giờ được phép làm thay đổi kích thước của thẻ xung quanh hay gây ra layout shift.
4. **Nguyên Tắc Độc Lập Tài Nguyên (Zero External Asset Dependency)**:
   - Toàn bộ đồ họa là vector SVG, toàn bộ âm thanh do Web Audio API tự tổng hợp bằng mã lệnh, toàn bộ hạt pháo hoa vẽ trên HTML5 Canvas. Ứng dụng hoạt động offline và tải trang gần như tức thì.
5. **Tôn Trọng Trạng Thái Người Dùng**:
   - Nút Mute trên thanh tiêu đề ghi nhớ trạng thái âm thanh.
   - Toàn bộ cài đặt đèn, hiệu ứng rèm, quà tặng và lịch sử đều được tự động lưu vào `localStorage`.

---

## 4. Công Nghệ & Kỹ Thuật Lập Trình (Technologies & Engineering)

| Thành phần | Công nghệ / Thư viện | Vai trò kỹ thuật |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server Components, Turbopack, tối ưu hóa Static Export |
| **Language** | TypeScript 5 | Strict typing toàn diện cho cấu hình quà, góc quay, đèn và âm thanh |
| **Styling** | Tailwind CSS 4 | Glassmorphism utility classes, custom keyframes, GPU acceleration |
| **Vector Engine** | Native SVG XML | Vẽ nan quạt, đinh tán, đèn LED, chóa đèn pha đa lớp Gaussian blur |
| **Math & Physics** | Custom Trigonometrics | Tọa độ cực nan quạt $(cx + R\cos\theta, cy + R\sin\theta)$, quartic easing |
| **Audio Engine** | Web Audio API | `AudioContext`, `OscillatorNode`, `GainNode`, `BiquadFilterNode` |
| **Particle Engine**| HTML5 Canvas 2D | Mô phỏng cơ học hạt pháo hoa Confetti với lực hấp dẫn & ma sát không khí |
| **Iconography** | Lucide React | 100+ icon vector công nghệ & giải thưởng |
| **Hosting & CI/CD**| Vercel Production | Edge CDN toàn cầu, tự động triển khai nhánh main |

---

## 5. Cấu Trúc Thư Mục Dự Án (Project Structure)

```
ios-18-lucky-wheel/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Cấu hình font chữ & HTML metadata
│   │   ├── page.tsx                # Trang chủ hội tụ toàn bộ sân khấu vòng quay
│   │   └── globals.css             # Định nghĩa keyframes chuyển động & utility glass
│   ├── components/
│   │   ├── canvas/
│   │   │   └── ConfettiCanvas.tsx   # Canvas 2D render hạt pháo hoa chúc mừng
│   │   ├── header/
│   │   │   └── Header.tsx          # Thanh công cụ kính mờ, chuyển theme, mute, menu
│   │   ├── modals/
│   │   │   ├── HistoryDrawer.tsx   # Ngăn kéo xem lịch sử trúng thưởng
│   │   │   └── VictoryModal.tsx    # Hộp thoại chúc mừng chiến thắng kèm thông tin quà
│   │   ├── settings/
│   │   │   ├── IconPickerModal.tsx # Hộp thoại chọn icon trực quan với tìm kiếm & danh mục
│   │   │   ├── PrizeRowItem.tsx    # Dòng chỉnh sửa thông tin phần thưởng 1 hàng tinh gọn
│   │   │   ├── SettingsDrawer.tsx  # Ngăn kéo chính quản lý cài đặt quà & đèn
│   │   │   └── SpotlightSettingsTab.tsx # Cài đặt góc chiếu, màu sắc đèn pha & rèm sân khấu
│   │   ├── stage/
│   │   │   └── StageCurtain.tsx    # Hoạt cảnh mở rèm sân khấu nhung đỏ & logo nhập lại
│   │   └── wheel/
│   │       ├── AmbientGlow.tsx     # Hào quang nền phía sau đĩa quay
│   │       ├── CenterHub.tsx       # Nút bấm "QUAY" 3D ở tâm vòng quay
│   │       ├── LuckyWheel.tsx      # Lắp ráp khung cơ khí vòng quay & các thành phần
│   │       ├── PointerNeedle.tsx   # Kim chỉ vị trí 12h với hiệu ứng nảy góc
│   │       ├── StageSpotlights.tsx # Động cơ 2 đèn sân khấu thể tích & hạt bụi 3D
│   │       ├── StatusPill.tsx      # Viên nang hiển thị trạng thái quay & kết quả
│   │       └── WheelSvg.tsx        # Render SVG nan quạt, đinh tán & đèn LED viền
│   ├── constants/
│   │   ├── defaultPrizes.ts        # Dữ liệu 10 phần quà công nghệ tiêu chuẩn
│   │   └── techIcons.tsx           # Bản đồ ánh xạ 100+ icon Lucide phong phú
│   ├── hooks/
│   │   ├── useConfetti.ts          # Điều khiển bắn pháo hoa hạt
│   │   ├── useLuckyWheel.ts        # Giải thuật tính góc quay, easing & va chạm kim chỉ
│   │   ├── usePrizeStore.ts        # Quản lý danh sách quà tặng & lưu LocalStorage
│   │   ├── useSoundEffects.ts      # Bộ tổng hợp âm thanh Web Audio API thuần
│   │   └── useSpotlightStore.ts    # Lưu trữ & đồng bộ cấu hình đèn sân khấu
│   ├── types/
│   │   └── wheel.ts                # Định nghĩa kiểu dữ liệu TypeScript
│   └── utils/
│       ├── audio.ts                # Kỹ thuật tổng hợp sóng âm thanh
│       └── geometry.ts             # Công thức toán lượng giác và góc nan quạt
├── public/                         # Tài nguyên tĩnh
├── package.json                    # Cấu hình dự án & dependencies
└── README.md                       # Tài liệu kỹ thuật chi tiết
```

---

## 6. Hướng Dẫn Cài Đặt & Chạy Dự Án (Getting Started)

### Yêu cầu môi trường
- Node.js 18+ trở lên
- Trình quản lý gói `npm`, `yarn`, `pnpm` hoặc `bun`

### Cài đặt dependencies
```bash
git clone https://github.com/17130239-coder/ios-18-lucky-wheel.git
cd ios-18-lucky-wheel
npm install
```

### Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

### Kiểm tra mã nguồn (Lint) & Đóng gói sản phẩm (Build)
```bash
npm run lint
npm run build
npm run start
```

