package com.marketplace.order.dto.response;

import com.marketplace.order.models.OrderStatus;
import lombok.Data;

@Data
public class StatusResponseDto {
        private Long id;
        private String name;
        public StatusResponseDto(OrderStatus orderStatus){
            this.id = orderStatus.getId();
            this.name = orderStatus.getStatus();
        }
}
