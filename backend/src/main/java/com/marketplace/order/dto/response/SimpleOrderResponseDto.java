package com.marketplace.order.dto.response;

import com.marketplace.order.models.Order;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SimpleOrderResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private String orderAmount;
    private String recipientEmail;
    private String status;

    public SimpleOrderResponseDto (Order order){
        this.id = order.getId();
        this.createdAt = order.getCreatedAt();
        this.modifyDate = order.getUpdatedAt();
        this.orderAmount = order.getAmount();
        this.recipientEmail = order.getRecipientEmail();
        this.status = order.getStatus().getStatus();
    }
}
