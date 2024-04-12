package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.dto.IBookingDetailDTO;
import com.example.sprint_2_be.model.Booking;
import com.example.sprint_2_be.repository.IBookingDetailsRepository;
import com.example.sprint_2_be.repository.IBookingRepository;
import com.example.sprint_2_be.service.IBookingService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class BookingService implements IBookingService {
    @Autowired
    private IBookingRepository iBookingRepository;
    @Autowired
    private IBookingDetailsRepository iBookingDetailsRepository;
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;


    @Override
    public Optional<Booking> findById(Long id) {
        return iBookingRepository.findById(id);
    }

    @Override
    public Iterator<Booking> findAll() {
        return null;
    }

    @Override
    public Booking save(Booking booking) {
        return iBookingRepository.save(booking);
    }

    @Override
    public void save1(Booking booking) {

    }

    @Override
    public void deleteById(Long id) {
        iBookingRepository.deleteById(id);
    }

    @Override
    public void updateStatus(Long idBooking) {
        iBookingRepository.updateStatus(idBooking);
    }

    @Override
    public void senMail(Long idBooking) {
//        Optional<IAccountDTO> account = accountRepository.findByIdAccountDTO(id);
//        if (account.isPresent()) {
//            accountRepository.updateAccountPassword(id, passwordEncoder.encode(newPassword));
//            String to = account.get().getEmail();
//            String subject = "[C0823G1-Cinema]-Phản hồi yêu cầu cấp lại mật khẩu tài khoản";
//            String templateName = "email-template";
//            org.thymeleaf.context.Context context = new org.thymeleaf.context.Context();
//            context.setVariable("fullName", account.get().getFullName());
//            context.setVariable("password", newPassword);
//            sendEmailWithHtmlTemplate(to, subject, templateName, context);
//        }
        List<IBookingDetailDTO> iBookingDetailDTOList = iBookingDetailsRepository.findAllBookingDetailDTO(idBooking);
        String to = iBookingDetailDTOList.get(0).getEmail();
        String subject = "[TOMO-SHOP]-Thông báo đơn hàng";
        String templateName = "email-template";
        org.thymeleaf.context.Context context = new org.thymeleaf.context.Context();
        context.setVariable("name", iBookingDetailDTOList.get(0).getFullName());
        Long total = 0L;
        for (IBookingDetailDTO bookingDetailDTO: iBookingDetailDTOList){
            total += bookingDetailDTO.getPrice() * bookingDetailDTO.getQuantity();
        }
        context.setVariable("list", iBookingDetailDTOList);
        context.setVariable("price", total);
        context.setVariable("qr", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                idBooking + "?price=" + total);
        sendEmailWithHtmlTemplate(to, subject, templateName, context);
    }

    public void sendEmailWithHtmlTemplate(String to, String subject, String templateName, Context context) {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            emailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
